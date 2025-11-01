import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "https://builderlms.vercel.app",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const authRoutes = ["/sign-in", "/sign-up"];

export function proxy(request: NextRequest) {
  // ============================== protecting routes ==============================

  const { pathname } = request.nextUrl;

  // === get token from cookie ===
  const token = request.cookies.get("token")?.value;

  // === check if route is protected (starts with /app) ===
  const isProtectedRoute = pathname.startsWith("/app");

  // === check if route is auth route ===
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // === redirect to sign-in if accessing protected route without token ===
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // === redirect to app if accessing auth route with token ===
  if (isAuthRoute && token) {
    const appUrl = new URL("/app", request.url);
    return NextResponse.redirect(appUrl);
  }

  // ============================== handling cors ==============================

  // === handle CORS for API routes ===
  if (pathname.startsWith("/api")) {
    const origin = request.headers.get("origin") ?? "";
    const isAllowedOrigin = allowedOrigins.includes(origin);

    // === handle preflighted requests ===
    const isPreflight = request.method === "OPTIONS";

    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
        ...corsOptions,
      };
      return NextResponse.json({}, { headers: preflightHeaders });
    }

    // === handle simple requests ===
    const response = NextResponse.next();

    // === attach token to authorization header for API routes ===
    if (token) {
      response.headers.set("Authorization", `${token}`);
    }

    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  // === default response for other routes ===
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/app/:path*", "/sign-in", "/sign-up"],
};
