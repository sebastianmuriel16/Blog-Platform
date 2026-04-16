import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedToken = localStorage.getItem("token");
  const initialPayload = storedToken ? parseJwt(storedToken) : null;
  const [token, setToken] = useState<string | null>(storedToken);
  const [userId, setUserId] = useState<string | null>(
    initialPayload?.userId || null,
  );

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    const payload = parseJwt(newToken);
    setUserId(payload.userId ?? null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated: !!token, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
}
