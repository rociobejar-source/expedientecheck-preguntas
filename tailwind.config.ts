import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0B2341",
          beige: "#F4EFE7",
          gold: "#D4A62A",
          green: "#1D8F6A",
          red: "#D64545",
          black: "#1C1C1C"
        }
      },
      fontFamily: {
        sans: [
          "Satoshi",
          "General Sans",
          "Plus Jakarta Sans",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        editorial: [
          "DM Serif Display",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif"
        ]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(11, 35, 65, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
