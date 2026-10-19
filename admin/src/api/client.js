import axios from "axios";
import { API_BASE_URL, USE_MOCK_DATA } from "../config/env";
import { AUTH_EXPIRED_EVENT, clearSession, getToken } from "../utils/auth";

// The one axios instance every request goes through. Content-Type is left to
// axios: JSON for plain objects, multipart (with boundary) for FormData.
export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

// Mock mode: answer every request from /mock/mockApi.js instead of the network.
// Loaded on demand, so it is not part of the normal bundle.
if (USE_MOCK_DATA) {
  http.defaults.adapter = (config) => import("@mock/mockApi.js").then((mock) => mock.mockAdapter(config));
}

// Which form fields a server error is about, so the form can show each message
// on its field: { fieldName: message }. A rejected upload names no field, so it
// is offered to both upload fields ("image" and "file"); the form shows it on
// the one it has.
const fieldsOf = (response, serverMessage) => {
  const upload = (text) => ({ image: text, file: text });
  const status = response?.status;
  if (status === 413)
    return upload("This file is too large. Images can be up to 5 MB and PDFs up to 20 MB.");
  if (typeof serverMessage === "string" && /^only .* (images|files) are allowed/i.test(serverMessage))
    return upload(serverMessage.replace(/^only/i, "Only"));
  if (status === 400 && Array.isArray(serverMessage)) {
    // Validation messages start with the field's name: "title should not be empty".
    const fields = {};
    serverMessage.forEach((text) => {
      const [name, ...rest] = String(text).split(" ");
      if (name && rest.length && !fields[name]) fields[name] = `${name[0].toUpperCase()}${name.slice(1)} ${rest.join(" ")}`.replace(/([a-z])([A-Z])/g, "$1 $2");
    });
    return fields;
  }
  return undefined;
};

// Turns any axios failure into an Error with a short, user-facing message
// (never a raw server payload), so callers only ever read `error.message`.
const toApiError = (error) => {
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
  apiError.fields = fieldsOf(error?.response, serverMessage);
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
