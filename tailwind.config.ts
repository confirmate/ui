import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        confirmate: "#007FC3",
        "confirmate-light": "#008CD7",
      },
      fontFamily: {
        sans: [
          "InterVariable, sans-serif",
          {
            fontFeatureSettings: '"cv11", "ss01"',
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
