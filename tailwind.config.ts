import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050608",
        panel: "rgba(255,255,255,0.08)",
        line: "rgba(255,255,255,0.12)",
        signal: "#8FE8C8",
        volt: "#B8F36B",
        ember: "#FF8A5B",
        ice: "#C8E7FF"
      },
      boxShadow: {
        glass: "0 20px 80px rgba(0,0,0,0.35)",
        button: "inset 0 1px 0 rgba(255,255,255,0.25), 0 12px 30px rgba(0,0,0,0.25)"
      },
      backgroundImage: {
        "cortex-field":
          "radial-gradient(circle at 20% 10%, rgba(143,232,200,.18), transparent 30%), radial-gradient(circle at 80% 0%, rgba(255,138,91,.16), transparent 26%), linear-gradient(135deg, #050608 0%, #101216 45%, #08090c 100%)"
      }
    }
  },
  plugins: []
};

export default config;
