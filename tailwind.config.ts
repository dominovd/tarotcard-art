import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          deep: "#0a0820",
          mid: "#14112e",
          card: "#1c1840",
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#f0d97b",
          dim: "#8a7028",
        },
        purple: {
          mystic: "#6a4cb8",
          light: "#a78ddb",
        },
        parchment: "#e8e4f5",
        mist: "#9a93b8",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      animation: {
        twinkle: "twinkle 8s ease-in-out infinite alternate",
        "fade-in": "fade-in 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        twinkle: {
          "0%": { opacity: "0.55" },
          "100%": { opacity: "0.85" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
