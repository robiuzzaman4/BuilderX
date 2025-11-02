// === auth related constants used on `proxy.ts` ===

export const DEFAULT_SIGN_IN_REDIRECT = "/dashboard";

export const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://builderlms.vercel.app",
];

export const CORS_OPTIONS = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const BASE_URL = "https://builderlms.vercel.app";
