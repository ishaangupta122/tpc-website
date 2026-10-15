// Where the admin's login token is kept (browser localStorage) and a few helpers.
// This module knows nothing about React or axios, so the API client can use it.
const TOKEN_KEY = "tpc_admin_token";
const USER_KEY = "tpc_admin_user";
export const AUTH_EXPIRED_EVENT = "tpc:auth-expired";

// localStorage can throw (private windows, blocked storage): treat as "signed out".
const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const getToken = () => read(TOKEN_KEY);

export const getStoredUser = () => {
  try {
    return JSON.parse(read(USER_KEY) || "null");
  } catch {
    return null;
  }
};

export const storeSession = (token, user) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // Nothing to do: the session just won't survive a reload.
  }
};

export const clearSession = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    // ignore
  }
};

// Reads the expiry out of the JWT. This is only a convenience so an expired
// token isn't used: the server is what actually enforces it.
export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return typeof payload.exp === "number" && payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};
