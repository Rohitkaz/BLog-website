/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Quicksand", "sans-serif", "modern"],
        flow: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
