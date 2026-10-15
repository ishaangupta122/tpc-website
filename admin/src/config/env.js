// Single source of truth for build-time configuration (Vite env variables).
//
//   VITE_BASE_API  Backend base URL (see .env.sample). Falls back to the local
//                  backend so a missing .env doesn't break every request.
const DEFAULT_DEV_API = "http://localhost:3000";

if (!import.meta.env.VITE_BASE_API && import.meta.env.PROD) {
  console.warn(
    "VITE_BASE_API is not set: API requests will target " + DEFAULT_DEV_API + "."
  );
}

export const API_BASE_URL = (
  import.meta.env.VITE_BASE_API || DEFAULT_DEV_API
).replace(/\/+$/, "");

