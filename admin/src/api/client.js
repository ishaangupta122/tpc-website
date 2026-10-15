import axios from "axios";
import { API_BASE_URL } from "../config/env";
import { AUTH_EXPIRED_EVENT, clearSession, getToken } from "../utils/auth";

// The one axios instance every request goes through. Content-Type is left to
// axios: JSON for plain objects, multipart (with boundary) for FormData.
export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

// Turns any axios failure into an Error with a short, user-facing message
// (never a raw server payload), so callers only ever read `error.message`.
export const toApiError = (error) => {
  if (error?.response?.status === 429) {
    const tooMany = new Error("Too many attempts. Please wait a minute and try again.");
    tooMany.status = 429;
    return tooMany;
  }
  const serverMessage = error?.response?.data?.message;
  const message = Array.isArray(serverMessage)
    ? serverMessage.join(", ")
    : serverMessage ||
      (error?.code === "ECONNABORTED" ? "The request timed out." : null) ||
      (error?.response
        ? `Request failed (${error.response.status}).`
        : "Cannot reach the server. Is the backend running?");
  const apiError = new Error(message);
  apiError.status = error?.response?.status;
  return apiError;
};

// Every request carries the admin's token (the public GET routes ignore it).
http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    // A 401 on anything but the login form means the session is gone
    // (expired or revoked): sign out so the user is sent to the login page.
    const isLogin = error?.config?.url === "/auth/login";
    if (error?.response?.status === 401 && !isLogin) {
      clearSession();
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    return Promise.reject(toApiError(error));
  }
);
