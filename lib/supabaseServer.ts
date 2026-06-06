import type { LeadPayload } from "@/types/lead";

type SupabaseInsertResponse = {
  saved: boolean;
  id?: string;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url, serviceRoleKey };
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseConfig());
}

function toLeadRow(payload: LeadPayload) {
  return {
    source: payload.source,
    name: payload.name ?? "",
    whatsapp: payload.whatsapp ?? "",
    email: payload.email,
    city: payload.city,
    property_type: payload.propertyType,
    average_bill: payload.averageBill,
    monthly_consumption: payload.monthlyConsumption,
    message: payload.message,
    simulation: payload.simulation,
    project_interest: payload.projectInterest,
    page_url: payload.pageUrl,
    user_agent: payload.userAgent,
    created_at: payload.createdAt
  };
}

export async function saveLeadToSupabase(
  payload: LeadPayload
): Promise<SupabaseInsertResponse> {
  const config = getSupabaseConfig();

  if (!config) {
    return { saved: false };
  }

  const response = await fetch(`${config.url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(toLeadRow(payload))
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase retornou ${response.status}: ${errorText.slice(0, 240)}`);
  }

  const data = (await response.json()) as Array<{ id?: string }>;

  return {
    saved: true,
    id: data[0]?.id
  };
}
