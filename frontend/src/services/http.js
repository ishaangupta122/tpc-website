import axios from "axios";
import { API_BASE_URL, USE_MOCK_DATA } from "../config/env";

// The one axios instance every API call goes through.
const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Mock mode: answer every request from /mock/mockApi.js instead of the network.
// Loaded on demand, so it is not part of the normal bundle.
if (USE_MOCK_DATA) {
  http.defaults.adapter = (config) => import("@mock/mockApi.js").then((mock) => mock.mockAdapter(config));
}

// List endpoints must return an array. If the server is down, the URL is wrong,
// or an HTML/other payload comes back, throw so the UI shows its error state
// instead of crashing on `.map` / `.filter`.
const ensureArray = (data, label) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  throw new Error(`Unexpected response while loading ${label}. Is the backend running?`);
};

// Turns any axios/network failure into a short, user-facing Error
// (never a stack trace or raw server payload).
const toError = (error, label) => {
  const message =
    error?.response?.data?.message ||
    (error?.code === "ECONNABORTED" ? "The request timed out." : null) ||
    error?.message ||
    `Failed to load ${label}.`;
  return new Error(message);
};

export const getList = async (path, label) => {
  try {
    const { data } = await http.get(path);
    return ensureArray(data, label);
  } catch (error) {
    throw toError(error, label);
  }
};

export const getOne = async (path, label) => {
  try {
    const { data } = await http.get(path);
    return data;
  } catch (error) {
    throw toError(error, label);
  }
};
