import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a146b",
          container: "#312e81",
          hover: "#4338ca",
          fixed: "#e2dfff",
          "fixed-dim": "#c3c0ff",
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#9c9af4",
        },
        secondary: {
          DEFAULT: "#006a61",
          container: "#86f2e4",
          hover: "#0d9488",
          fixed: "#89f5e7",
          "fixed-dim": "#6bd8cb",
        },
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#006f66",
        },
        tertiary: {
          DEFAULT: "#3b1c00",
          container: "#5b2e00",
          fixed: "#ffdcc3",
          "fixed-dim": "#ffb77d",
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#f18a21",
        },
        surface: {
          DEFAULT: "#faf8ff",
          dim: "#d2d9f4",
          bright: "#faf8ff",
          container: {
            lowest: "#ffffff",
            low: "#f2f3ff",
            DEFAULT: "#eaedff",
            high: "#e2e7ff",
            highest: "#dae2fd",
          },
        },
        "on-surface": {
          DEFAULT: "#131b2e",
          variant: "#474651",
        },
        outline: {
          DEFAULT: "#777682",
          variant: "#c8c5d3",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-error": {
          DEFAULT: "#ffffff",
          container: "#93000a",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        "gutter-sm": "1rem",
        gutter: "1.5rem",
        "gutter-lg": "2rem",
        "margin-sm": "1rem",
        margin: "1.5rem",
        "margin-lg": "3rem",
      },
    },
  },
  plugins: [],
};

export default config;
