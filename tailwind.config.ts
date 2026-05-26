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
          "radial-gradient(circle at 15% 10%, rgba(108,255,210,.16), transparent 28%), radial-gradient(circle at 82% 6%, rgba(255,111,82,.12), transparent 27%), radial-gradient(circle at 52% 72%, rgba(157,183,255,.1), transparent 31%), linear-gradient(135deg, #060908 0%, #0e1110 34%, #14100f 64%, #06070a 100%)"
      }
    }
  },
  plugins: []
};

export default config;
