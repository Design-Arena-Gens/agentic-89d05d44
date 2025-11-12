import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Rajdhani'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#f3f9ff",
          100: "#e1f0ff",
          200: "#bfdfff",
          300: "#8ac6ff",
          400: "#52a4ff",
          500: "#1e82ff",
          600: "#0f63d6",
          700: "#0b4cab",
          800: "#0d3d86",
          900: "#0f326d"
        }
      },
      boxShadow: {
        card: "0 20px 45px -20px rgba(30, 130, 255, 0.35)"
      }
    }
  },
  plugins: [],
};

export default config;
