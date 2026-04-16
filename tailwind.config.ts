import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          surface: "rgb(var(--color-surface) / <alpha-value>)",
          "surface-alt": "rgb(var(--color-surface-alt) / <alpha-value>)",
          border: "rgb(var(--color-border) / <alpha-value>)",
          text: "rgb(var(--color-text) / <alpha-value>)",
          textMuted: "rgb(var(--color-text-muted) / <alpha-value>)",
          buttonText: "rgb(var(--color-button-text) / <alpha-value>)",
          primaryAccent: "rgb(var(--color-accent-primary) / <alpha-value>)",
          secondaryAccent: "rgb(var(--color-accent-secondary) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
