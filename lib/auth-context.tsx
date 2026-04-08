import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "Password@123";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login: (username, password) => {
        const isValid =
          username.trim() === DEFAULT_USERNAME && password === DEFAULT_PASSWORD;

        setIsAuthenticated(isValid);
        return isValid;
      },
      logout: () => setIsAuthenticated(false),
    }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
