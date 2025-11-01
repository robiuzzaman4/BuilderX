import { NextRequest, NextResponse } from "next/server";
import {
  ALLOWED_ORIGINS,
  AUTH_ROUTES,
  CORS_OPTIONS,
  DEFAULT_SIGN_IN_REDIRECT,
} from "./constant";

export function proxy(request: NextRequest) {
  // ============================== protecting routes ==============================

  const { pathname } = request.nextUrl;

  // === get token from cookie ===
  const token = request.cookies.get("token")?.value;

  // === check if route is protected (starts with /dashboard) ===
  const isProtectedRoute = pathname.startsWith(DEFAULT_SIGN_IN_REDIRECT);

  // === check if route is auth route ===
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // === redirect to sign-in if accessing protected route without token ===
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // === redirect to DEFAULT_SIGN_IN_REDIRECT if accessing auth route with token ===
  if (isAuthRoute && token) {
    const dashboardUrl = new URL(DEFAULT_SIGN_IN_REDIRECT, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // ============================== handling cors ==============================

  // === handle CORS for API routes ===
  if (pathname.startsWith("/api")) {
    const origin = request.headers.get("origin") ?? "";
    const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);

    // === handle preflighted requests ===
    const isPreflight = request.method === "OPTIONS";

    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
        ...CORS_OPTIONS,
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

    Object.entries(CORS_OPTIONS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  // === default response for other routes ===
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/sign-in", "/sign-up"],
};
