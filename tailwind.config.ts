import type { Config } from "tailwindcss";
import twScrollBarHide from "tailwind-scrollbar-hide";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        whitesmoke: "#f2f5f6",
        gray: {
          "100": "#202020",
          "200": "rgba(0, 0, 0, 0.3)",
        },
        blueviolet: {
          "100": "#a157ff",
          "200": "#7931f0",
          "300": "rgba(121, 49, 240, 0.6)",
        },
        white: "#fff",
        darkslategray: "#303030",
        lavender: "#ece0ff",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      spacing: {},
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "32xl": "51px",
        "6xl": "25px",
        "4xl": "23px",
      },
      fontSize: {
        "5sxl": "1.5rem",
        lgi: "1.188rem",
        base: "1rem",
        inherit: "inherit",
        "63xl": "5.125rem",
        "6sxl": "1.563rem",
        "10xl": "1.813rem",
        "22xl": "2.563rem",
      },
      corePlugins: {
        preflight: false,
      },
      screens: {
        // for height
        "h-sm": { raw: "(min-height: 600px)" },
        "h-md": { raw: "(min-height: 800px)" },
        "h-lg": { raw: "(min-height: 1000px)" },
        "tab": "820px"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), twScrollBarHide],
} satisfies Config;

export default config;
