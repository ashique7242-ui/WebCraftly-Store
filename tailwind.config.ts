import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#6A0006",
        "primary-container": "#8E1616",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#FF9B91",
        
        "secondary": "#735C00",
        "secondary-container": "#FED65B",
        "secondary-fixed": "#FFE088",
        "gilded-gold": "#D4AF37",
        "gilded-light": "#FFF7D9",
        "gilded-border": "#E5C158",
        
        "espresso": "#1C1C18",
        "espresso-light": "#59413E",
        "on-surface": "#1C1C18",
        "on-surface-variant": "#59413E",
        
        "surface": "#FCF9F2",
        "surface-bright": "#FFFDF9",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F6F3EC",
        "surface-container": "#F0EEE7",
        "surface-container-high": "#EBE8E1",
        "surface-container-highest": "#E5E2DB",
        "background": "#FCF9F2",
        
        "outline": "#8D706D",
        "outline-variant": "#E0BFBB"
      },
      fontFamily: {
        "headline-lg": ["Newsreader", "serif"],
        "headline-md": ["Newsreader", "serif"],
        "headline-sm": ["Newsreader", "serif"],
        "body-lg": ["Hanken Grotesk", "sans-serif"],
        "body-md": ["Hanken Grotesk", "sans-serif"],
        "body-sm": ["Hanken Grotesk", "sans-serif"],
        "label-lg": ["Hanken Grotesk", "sans-serif"],
        "label-md": ["Hanken Grotesk", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        "cushioned": "0 10px 30px -6px rgba(106, 0, 6, 0.07), 0 4px 12px -2px rgba(28, 28, 24, 0.04)",
        "cushioned-hover": "0 18px 40px -8px rgba(106, 0, 6, 0.12), 0 8px 18px -4px rgba(28, 28, 24, 0.06)",
        "pressed": "inset 0 2px 4px 0 rgba(28, 28, 24, 0.06)"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};
export default config;
