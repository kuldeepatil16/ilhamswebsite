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
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(10, 46, 77, 0.08)",
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
