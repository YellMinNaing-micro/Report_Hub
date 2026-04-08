import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeColors = {
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  bubblePrimary: string;
  bubbleSecondary: string;
  surface: string;
  surfaceInset: string;
  border: string;
  borderSoft: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  primary: string;
  primarySoft: string;
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
    background: "#f2f6fc",
    backgroundSecondary: "#eaf1fb",
    backgroundTertiary: "#dde7f6",
    bubblePrimary: "rgba(117, 159, 234, 0.14)",
    bubbleSecondary: "rgba(255, 255, 255, 0.55)",
    surface: "#ffffff",
    surfaceInset: "#f6f9ff",
    border: "#d9e4f2",
    borderSoft: "#edf3fb",
    borderStrong: "#adc4e7",
    text: "#11213f",
    textMuted: "#5e7193",
    textSubtle: "#8090ad",
    primary: "#4f94ff",
    primarySoft: "#dceaff",
    primaryText: "#ffffff",
    danger: "#ef5b6c",
    dangerSoft: "#ffe5e8",
    success: "#17b27a",
    successSoft: "#e8fbf2",
    tabBar: "#ffffff",
    tabActive: "#4f94ff",
    tabActiveText: "#ffffff",
    tabInactiveText: "#7b8aa7",
    shadow: "#93a7c6",
    shadowSoft: "#ffffff",
  },
  dark: {
    background: "#111a31",
    backgroundSecondary: "#16213c",
    backgroundTertiary: "#1b2947",
    bubblePrimary: "rgba(88, 142, 255, 0.13)",
    bubbleSecondary: "rgba(255, 255, 255, 0.04)",
    surface: "#1b2740",
    surfaceInset: "#18233a",
    border: "#30415f",
    borderSoft: "#22314e",
    borderStrong: "#4f94ff",
    text: "#f5f8ff",
    textMuted: "#a7b3ca",
    textSubtle: "#6f82a7",
    primary: "#4f94ff",
    primarySoft: "#19335f",
    primaryText: "#ffffff",
    danger: "#ff6c74",
    dangerSoft: "#3a2431",
    success: "#1fc88f",
    successSoft: "#16362f",
    tabBar: "#151f36",
    tabActive: "#4f94ff",
    tabActiveText: "#f8fafc",
    tabInactiveText: "#6f82a7",
    shadow: "#020817",
    shadowSoft: "#263657",
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
