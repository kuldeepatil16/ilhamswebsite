import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#061B2E",
        "dark-blue": "#0A2E4D",
        blue: "#1B6FAE",
        "light-blue": "#61B4E8",
        ice: "#E8F4FD",
        accent: "#F7931E",
        "accent-light": "#FDB540",
        secondary: "#006D3A",
        "secondary-container": "#75FCA5",
        "secondary-fixed": "#75FCA5",
        tertiary: "#3E1B00",
        "tertiary-container": "#5E2D00",
        "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-soft": "rgb(var(--surface-soft) / <alpha-value>)",
        "surface-border": "rgb(var(--surface-border) / <alpha-value>)",
        "surface-container-lowest": "rgb(var(--surface-container-lowest) / <alpha-value>)",
        "surface-container-low": "rgb(var(--surface-container-low) / <alpha-value>)",
        "surface-container": "rgb(var(--surface-container) / <alpha-value>)",
        "surface-container-high": "rgb(var(--surface-container-high) / <alpha-value>)",
        "surface-container-highest": "rgb(var(--surface-container-highest) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        overlay: "rgb(var(--overlay) / <alpha-value>)",
        contrast: "rgb(var(--contrast) / <alpha-value>)",
        "contrast-muted": "rgb(var(--contrast-muted) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        "danger-foreground": "rgb(var(--danger-foreground) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        "success-foreground": "rgb(var(--success-foreground) / <alpha-value>)",
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        card: "0 16px 40px rgb(var(--shadow) / 0.16)",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.08)", opacity: "1" },
        },
      },
      animation: {
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
      },
    },
  },
};

export default config;
