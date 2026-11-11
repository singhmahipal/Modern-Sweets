import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: "#FF9933",
          light: "#FFAE5E",
          dark: "#E68019",
        },
        cream: {
          DEFAULT: "#FFF8E7",
          light: "#FFFDF6",
          dark: "#F5ECD3",
        },
        "dark-brown": {
          DEFAULT: "#3E2723",
          light: "#4E342E",
          dark: "#2A1810",
        },
        gold: {
          DEFAULT: "#D4A017",
          light: "#E5B834",
          dark: "#B38600",
        },
      },
    },
  },
  plugins: [],
};

export default config;
