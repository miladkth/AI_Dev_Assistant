/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // <- för att Tailwind ska hitta alla komponenter
  ],
  darkMode: "class", // <- aktiverar mörkt läge via klass
  theme: {
    extend: {},
  },
  plugins: [],
};
