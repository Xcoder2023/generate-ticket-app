import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#0b1e2e",
        cardBg: "#112b3c",
        textPrimary: "#b4c7e7",
        buttonBg: "#1282a2",
        borderColor: "#0E464F",
      },
    },
  },
  plugins: [],
} satisfies Config;
