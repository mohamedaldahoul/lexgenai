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
        primary: {
          DEFAULT: '#0F2A4D',
          light: '#1A3A6B',
          dark: '#0A1A2D',
        },
        secondary: {
          DEFAULT: '#3C4657',
          light: '#4A5568',
          dark: '#2D3748',
        },
        accent: {
          DEFAULT: '#B7950B',
          light: '#D4B11E',
          dark: '#9A7D09',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
};

export default config; 