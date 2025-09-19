import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        // Treasury specific colors
        vault: {
          glow: "hsl(var(--vault-glow))",
        },
        encryption: {
          glow: "hsl(var(--encryption-glow))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // Treasury animations
        "vault-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsl(var(--vault-glow) / 0.3)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 40px hsl(var(--vault-glow) / 0.6)",
            transform: "scale(1.02)",
          },
        },
        "encryption-pulse": {
          "0%, 100%": {
            opacity: "0.4",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
        },
        "treasure-fill": {
          "0%": {
            transform: "scaleY(0)",
            transformOrigin: "bottom",
          },
          "100%": {
            transform: "scaleY(1)",
            transformOrigin: "bottom",
          },
        },
        "coin-drop": {
          "0%": {
            transform: "translateY(-100px) rotate(0deg)",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0) rotate(360deg)",
            opacity: "1",
          },
        },
        "secure-scan": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "value-count": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)",
            color: "hsl(var(--primary))",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Treasury animations
        "vault-glow": "vault-glow 3s ease-in-out infinite",
        "encryption-pulse": "encryption-pulse 2s ease-in-out infinite",
        "treasure-fill": "treasure-fill 2s ease-out forwards",
        "coin-drop": "coin-drop 1.5s ease-out forwards",
        "secure-scan": "secure-scan 2s linear infinite",
        "value-count": "value-count 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
