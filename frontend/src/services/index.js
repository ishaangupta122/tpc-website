// The single entry point to the backend API. In mock mode (VITE_USE_MOCK_DATA=true)
// the same calls are answered by the shared mock in /mock/mockApi.js (see http.js).
import * as api from "./api";

export { api };
