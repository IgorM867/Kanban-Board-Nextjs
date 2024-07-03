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
        "background-color": "#0B132B",
        "primary-color": "#1C2541",
        "secondary-color": "#677DB7",
        "font-primary-color": "#FFFFFF",
        "font-secondary-color": "rgba(255,255,255,0.65)",
      },
    },
  },
  plugins: [],
};
export default config;
