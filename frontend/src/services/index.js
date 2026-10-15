// Picks the data source once, at startup. Production builds use the real API
// unless VITE_USE_MOCK_DATA=true is set explicitly.
import { USE_MOCK_DATA } from "../config/env";
import * as realApi from "./api";
import * as mockApi from "../data/mockApi";

export const api = USE_MOCK_DATA ? mockApi : realApi;
