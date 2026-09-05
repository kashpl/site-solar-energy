import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#00142a",
        "solar-blue": "#1479d8",
        "solar-green": "#35b957",
        "solar-gold": "#e6b329",
        "solar-orange": "#f06a18",
        "silver-white": "#f5f7fa",
        "gray-dark": "#e8ecf1",
        canvas: "#efede6",
        paper: "#f8f6f0",
        "ink-muted": "#4d6070",
        line: "#ced3d1"
      },
      boxShadow: {
        glow: "0 0 36px rgba(0, 208, 132, 0.24)",
        gold: "0 0 34px rgba(255, 215, 0, 0.22)"
      },
      animation: {
        "pulse-slow": "pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.42" },
          "50%": { opacity: "0.82" },
        }
      },
      backgroundImage: {
        "solar-gradient":
          "linear-gradient(135deg, #001a4d 0%, #0052cc 58%, #00d084 100%)",
        "gold-green":
          "linear-gradient(135deg, #00d084 0%, #ffd700 100%)"
      }
    }
  },
  plugins: []
};

export default config;
