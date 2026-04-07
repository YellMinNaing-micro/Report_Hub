/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d8edff",
          200: "#b4dcff",
          300: "#7ec3ff",
          400: "#41a2ff",
          500: "#167cff",
          600: "#0d5fe8",
          700: "#104cc3",
          800: "#15429c",
          900: "#18397a",
        },
      },
    },
  },
  plugins: [],
};
