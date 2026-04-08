import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeColors = {
  background: string;
  backgroundSecondary: string;
  bubblePrimary: string;
  bubbleSecondary: string;
  surface: string;
  surfaceInset: string;
  border: string;
  borderSoft: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  primary: string;
  primaryText: string;
  danger: string;
  dangerSoft: string;
  success: string;
  successSoft: string;
  tabBar: string;
  tabActive: string;
  tabActiveText: string;
  tabInactiveText: string;
  shadow: string;
  shadowSoft: string;
};

type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const palettes: Record<ThemeMode, ThemeColors> = {
  light: {
    background: "#eef2f7",
    backgroundSecondary: "#f7f9fc",
    bubblePrimary: "rgba(255,255,255,0.5)",
    bubbleSecondary: "rgba(203,213,225,0.35)",
    surface: "#f8fafc",
    surfaceInset: "#ffffff",
    border: "#e2e8f0",
    borderSoft: "#f8fafc",
    text: "#0f172a",
    textMuted: "#475569",
    textSubtle: "#64748b",
    primary: "#2563eb",
    primaryText: "#ffffff",
    danger: "#e11d48",
    dangerSoft: "#fff1f2",
    success: "#047857",
    successSoft: "#edf7f0",
    tabBar: "#e9eef5",
    tabActive: "#2563eb",
    tabActiveText: "#0f172a",
    tabInactiveText: "#64748b",
    shadow: "#64748b",
    shadowSoft: "#ffffff",
  },
  dark: {
    background: "#0f172a",
    backgroundSecondary: "#111827",
    bubblePrimary: "rgba(37,99,235,0.12)",
    bubbleSecondary: "rgba(148,163,184,0.10)",
    surface: "#111c2f",
    surfaceInset: "#0b1220",
    border: "#22314a",
    borderSoft: "#172033",
    text: "#f8fafc",
    textMuted: "#cbd5e1",
    textSubtle: "#94a3b8",
    primary: "#60a5fa",
    primaryText: "#0f172a",
    danger: "#fb7185",
    dangerSoft: "#3a1620",
    success: "#34d399",
    successSoft: "#11251f",
    tabBar: "#0b1220",
    tabActive: "#60a5fa",
    tabActiveText: "#f8fafc",
    tabInactiveText: "#94a3b8",
    shadow: "#020617",
    shadowSoft: "#1e293b",
  },
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark: mode === "dark",
      colors: palettes[mode],
      toggleTheme: () => setMode((current) => (current === "light" ? "dark" : "light")),
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
}
