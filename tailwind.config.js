/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5aa9e6",
        success: "#5dff6d",
        danger: "#ff6392",
        info: "#7fc8e8",
        secondary: "#7a7a7a",
        lightDanger: "#FF8B92",
        warning: "#ffe45e",
        transparent: "transparent",
        current: "currentColor",
        get_pink: "#EF476F",
        get_yellow: "#FFD166",
        get_cyan: "#06D6A0",
        get_blue: "#118AB2",
        get_navy: "#073B4C",
        get_text: "#2D2D2D",
        get_desc: "#555555",
        get_light_desc: "#9f9f9f",
        get_light_bg: "#f6f7fb",
        white: "#ffffff",
        main: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
      },
      fontSize: {
        xxs: [
          "0.675rem",
          {
            lineHeight: "0.875rem",
          },
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
