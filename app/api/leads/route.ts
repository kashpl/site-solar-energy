import { NextResponse } from "next/server";
import {
  formatLeadForWebhook,
  sanitizeLeadPayload,
  validateLeadPayload
} from "@/lib/leads";
import { isSupabaseConfigured, saveLeadToSupabase } from "@/lib/supabaseServer";
import type { LeadPayload } from "@/types/lead";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function jsonResponse(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });

    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  rateLimitStore.set(key, current);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - current.count
  };
}

function isBodyTooLarge(request: Request) {
  const contentLength = request.headers.get("content-length");

  return contentLength ? Number(contentLength) > MAX_BODY_BYTES : false;
}

async function parseJsonBody(request: Request) {
  const text = await request.text();

  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    throw new Error("PAYLOAD_TOO_LARGE");
  }

  return JSON.parse(text) as Record<string, unknown>;
}

async function sendLeadWebhook(payload: LeadPayload) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  const url = new URL(webhookUrl);

  if (!["https:", "http:"].includes(url.protocol)) {
    throw new Error("Webhook de leads com protocolo invalido.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatLeadForWebhook(payload)),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Webhook retornou ${response.status}.`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(getClientIp(request));

  if (!rateLimit.allowed) {
    return jsonResponse(
      {
        success: false,
        message: "Muitas solicitações em pouco tempo. Tente novamente em alguns minutos.",
        errors: {}
      },
      429
    );
  }

  if (isBodyTooLarge(request)) {
    return jsonResponse(
      {
        success: false,
        message: "A solicitação enviada é muito grande.",
        errors: {}
      },
      413
    );
  }

  let rawPayload: Record<string, unknown>;

  try {
    rawPayload = await parseJsonBody(request);
  } catch (error) {
    const status = error instanceof Error && error.message === "PAYLOAD_TOO_LARGE" ? 413 : 400;

    return jsonResponse(
      {
        success: false,
        message:
          status === 413
            ? "A solicitação enviada é muito grande."
            : "Não foi possível ler os dados enviados.",
        errors: {}
      },
      status
    );
  }

  const payload = sanitizeLeadPayload({
    ...rawPayload,
    userAgent: rawPayload.userAgent ?? request.headers.get("user-agent") ?? undefined,
    createdAt: new Date().toISOString()
  });

  const validation = validateLeadPayload(payload);

  if (!validation.valid) {
    return jsonResponse(
      {
        success: false,
        message: "Preencha os campos obrigatórios.",
        errors: validation.errors
      },
      400
    );
  }

  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[leads] Lead recebido em desenvolvimento:", {
        source: payload.source,
        city: payload.city,
        createdAt: payload.createdAt
      });

      return jsonResponse(
        {
          success: true,
          simulated: true,
          message:
            "Solicitação recebida em ambiente local. Configure o Supabase para salvar em produção."
        },
        200
      );
    }

    return jsonResponse(
      {
        success: false,
        message:
          "Backend de leads não configurado. Configure o Supabase para receber solicitações.",
        errors: {}
      },
      503
    );
  }

  try {
    const result = await saveLeadToSupabase(payload);

    try {
      await sendLeadWebhook(payload);
    } catch (error) {
      console.warn(
        "[leads] Webhook opcional falhou:",
        error instanceof Error ? error.message : "erro desconhecido"
      );
    }

    return jsonResponse(
      {
        success: true,
        saved: result.saved,
        leadId: result.id,
        message:
          "Solicitação enviada com sucesso. Nossa equipe entrará em contato em breve."
      },
      200
    );
  } catch (error) {
    console.error(
      "[leads] Falha ao salvar lead:",
      error instanceof Error ? error.message : "erro desconhecido"
    );

    return jsonResponse(
      {
        success: false,
        message: "Não foi possível salvar sua solicitação agora.",
        errors: {}
      },
      502
    );
  }
}

export function GET() {
  return NextResponse.json(
    {
      success: false,
      message: "Método não permitido. Use POST para enviar leads."
    },
    {
      status: 405,
      headers: {
        Allow: "POST",
        "Cache-Control": "no-store"
      }
    }
  );
}
