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
        navy: "#06171f",
        "solar-blue": "#0a4a5a",
        "solar-green": "#b8f04a",
        "solar-gold": "#f6c453",
        "silver-white": "#f5f7f2",
        "gray-dark": "#d6ddd8"
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
          "linear-gradient(135deg, #06171f 0%, #0a4a5a 58%, #b8f04a 100%)",
        "gold-green":
          "linear-gradient(135deg, #b8f04a 0%, #f6c453 100%)"
      }
    }
  },
  plugins: []
};

export default config;
