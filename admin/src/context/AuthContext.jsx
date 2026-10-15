import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authApi } from "../api";
import {
  AUTH_EXPIRED_EVENT,
  clearSession,
  getStoredUser,
  getToken,
  isTokenExpired,
  storeSession,
} from "../utils/auth";

const AuthContext = createContext(null);

// The signed-in admin, restored from the stored token on load.
//   const { user, isAuthenticated, login, logout } = useAuth();
// login() throws an Error with a readable message when the credentials are wrong.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = getToken();
    return token && !isTokenExpired(token) ? getStoredUser() : null;
  });

  const login = useCallback(async (email, password) => {
    const { accessToken, user: profile } = await authApi.login(email, password);
    storeSession(accessToken, profile);
    setUser(profile);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  // A stored token may have been revoked or tampered with: ask the server once
  // on load. A rejection (401) is handled by the listener below and signs out.
  useEffect(() => {
    if (user) authApi.me().catch(() => {});
    // Only on first load: later sign-ins are verified by the login itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The API client fires this when the server rejects the token (401).
  useEffect(() => {
    window.addEventListener(AUTH_EXPIRED_EVENT, logout);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, logout);
  }, [logout]);

  // Sign out on schedule when the token runs out, even if the tab sits idle.
  useEffect(() => {
    const timer = setInterval(() => {
      const token = getToken();
      if (user && (!token || isTokenExpired(token))) logout();
    }, 30_000);
    return () => clearInterval(timer);
  }, [user, logout]);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};
