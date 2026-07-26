/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        quest: {
          bg: "#0c0618",
          surface: "#1a0f2e",
          card: "#251545",
          border: "#4a2b85",
          primary: "#00e5ff",
          accent: "#00d4e0",
          secondary: "#ff5ebc",
          purple: "#b967ff",
          pink: "#ff5ebc",
          blue: "#4facfe",
          cyan: "#00f5ff",
          sos: "#ff9500",
          gold: "#ffd700",
          success: "#00e676",
          danger: "#ff3366",
          warning: "#ffb300",
          muted: "#9b8ec7",
          text: "#ffffff",
          dim: "#d4c8f0",
        },
      },
      fontFamily: {
        display: ["Atkinson Hyperlegible", "Microsoft YaHei", "sans-serif"],
        body: ["Atkinson Hyperlegible", "Microsoft YaHei", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "badge-shine": "badgeShine 3s ease-in-out infinite",
        bounce: "bounce 1s infinite",
        wiggle: "wiggle 0.5s ease-in-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.4s ease-out",
        "pop-in": "popIn 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "rainbow": "rainbow 4s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(185, 103, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 229, 255, 0.8), 0 0 80px rgba(185, 103, 255, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        badgeShine: {
          "0%, 100%": { filter: "brightness(1) drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))" },
          "50%": { filter: "brightness(1.4) drop-shadow(0 0 35px rgba(255, 215, 0, 1))" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "70%": { transform: "scale(1.1)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 229, 255, 0.5)" },
          "50%": { boxShadow: "0 0 25px rgba(0, 229, 255, 0.9), 0 0 50px rgba(185, 103, 255, 0.5)" },
        },
        rainbow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
