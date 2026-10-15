// Single source of truth for build-time configuration (Vite env variables).
//
//   VITE_BASE_URL       Backend base URL, e.g. https://api.example.com
//   VITE_USE_MOCK_DATA  "true" serves the temporary static data in
//                       data/mockData.js instead of calling the backend.
//                       Anything else (or unset) uses the real backend.

const DEFAULT_DEV_API = "http://localhost:3000";

const rawBaseUrl = import.meta.env.VITE_BASE_URL;

if (!rawBaseUrl && import.meta.env.PROD) {
  console.warn(
    "VITE_BASE_URL is not set: API requests will target " + DEFAULT_DEV_API + "."
  );
}

export const API_BASE_URL = (rawBaseUrl || DEFAULT_DEV_API).replace(/\/+$/, "");

export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";
