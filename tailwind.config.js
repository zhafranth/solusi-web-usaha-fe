/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(214.3 31.8% 91.4%)",
        input: "hsl(214.3 31.8% 91.4%)",
        ring: "hsl(222.2 84% 4.9%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        primary: {
          blue: "#235EE0",
          green: "#10B981",
          DEFAULT: "hsl(222.2 47.4% 11.2%)",
          foreground: "hsl(210 40% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(210 40% 96%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(210 40% 98%)",
        },
        muted: {
          DEFAULT: "hsl(210 40% 96%)",
          foreground: "hsl(215.4 16.3% 46.9%)",
        },
        accent: {
          white: "#FFFFFF",
          DEFAULT: "hsl(210 40% 96%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        slate: {
          925: "#0a1628",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(35, 94, 224, 0.08)",
        "glass-lg": "0 16px 48px rgba(35, 94, 224, 0.12)",
        "card-hover": "0 20px 60px rgba(35, 94, 224, 0.15)",
        "inner-glow": "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "blue-mesh":
          "radial-gradient(at 20% 80%, rgba(35, 94, 224, 0.15) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
        "hero-gradient":
          "linear-gradient(135deg, #235EE0 0%, #1a4bc0 40%, #0f3a9e 100%)",
      },
    },
  },
  plugins: [],
};
