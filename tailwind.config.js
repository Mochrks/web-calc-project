const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,jsx}",
    "./components/**/*.{ts,tsx,jsx}",
    "./app/**/*.{ts,tsx,jsx}",
    "./src/**/*.{ts,tsx,jsx}",
  ],
  theme: {
    container: {
      center: "true",
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        main: "#a388ee",
        mainAccent: "#9e66ff",
        secondary: "#d8b4fe", // not needed for shadcn components
        overlay: "rgba(0,0,0,0.8)", // background color overlay for alert dialogs, modals, etc.

        // light mode
        bg: "#e3dff2",
        text: "#000",
        border: "#000",

        // dark mode
        darkBg: "#1D1F27",
        darkText: "#eeefe9",
        darkBorder: "#000",
        secondaryBlack: "#1b1b1b", // opposite of plain white, not used pitch black because borders and box-shadows are that color
      },
      borderRadius: {
        base: "6px",
      },
      boxShadow: {
        light: "2px 6px 0px 0px #000",
        dark: "2px 6px 0px 0px #000",
      },
      translate: {
        boxShadowX: "2px",
        boxShadowY: "6px",
        reverseBoxShadowX: "-2px",
        reverseBoxShadowY: "-6px",
      },
      fontWeight: {
        base: "600",
        heading: "700",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
