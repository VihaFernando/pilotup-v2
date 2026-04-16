import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from "react";

type Palette = {
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  buttonText: string;
  primaryAccent: string;
  secondaryAccent: string;
};

function hexToRgbChannels(hex: string): string {
  const normalized = hex.replace("#", "").trim();
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const value = Number.parseInt(expanded, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r} ${g} ${b}`;
}

const defaultPalette: Palette = {
  surface: "#FFFFFF",
  surfaceAlt: "#1e293b",
  border: "#334155",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  buttonText: "#ffffff",
  primaryAccent: "#f97316",
  secondaryAccent: "#6366f1",
};

// Light Mode Palette
const lightPalette: Palette = {
  surface: "#FFFFFF", // Slate 50
  surfaceAlt: "#FAFBFC", // Slate 100
  border: "#e2e8f0", // Slate 200
  text: "#1A1A1A", // Slate 900
  textMuted: "#666666", // Slate 500
  buttonText: "#ffffff", // Pure white
  primaryAccent: "#fc5e56", // FC5E56 (same as dark)
  secondaryAccent: "#2B2B2B", // Indigo 500
};

const ThemeContext = createContext<{ palette: Palette }>({ palette: lightPalette });

export function ThemeProvider({ children }: PropsWithChildren) {
  const value = useMemo(() => ({ palette: lightPalette }), []);

  useEffect(() => {
    const root = document.documentElement;
    const p = value.palette;
    root.style.setProperty("--color-surface", hexToRgbChannels(p.surface));
    root.style.setProperty("--color-surface-alt", hexToRgbChannels(p.surfaceAlt));
    root.style.setProperty("--color-border", hexToRgbChannels(p.border));
    root.style.setProperty("--color-text", hexToRgbChannels(p.text));
    root.style.setProperty("--color-text-muted", hexToRgbChannels(p.textMuted));
    root.style.setProperty("--color-button-text", hexToRgbChannels(p.buttonText));
    root.style.setProperty("--color-accent-primary", hexToRgbChannels(p.primaryAccent));
    root.style.setProperty("--color-accent-secondary", hexToRgbChannels(p.secondaryAccent));
  }, [value]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemePalette() {
  return useContext(ThemeContext).palette;
}
