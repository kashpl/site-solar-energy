import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  async headers() {
    const scriptSrc = isDevelopment
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:"
      : "script-src 'self' 'unsafe-inline'";
    const connectSrc = isDevelopment
      ? "connect-src 'self' ws: http://127.0.0.1:3000 http://localhost:3000 https://wa.me https://api.whatsapp.com"
      : "connect-src 'self' https://wa.me https://api.whatsapp.com";

    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          scriptSrc,
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          connectSrc,
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
          ...(!isDevelopment ? ["upgrade-insecure-requests"] : [])
        ].join("; ")
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload"
      },
      {
        key: "X-Frame-Options",
        value: "DENY"
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff"
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin"
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()"
      },
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin"
      },
      {
        key: "Cross-Origin-Resource-Policy",
        value: "same-origin"
      }
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders
      }
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"]
  },
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true
};

export default nextConfig;
