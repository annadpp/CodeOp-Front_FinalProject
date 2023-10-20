/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F2EEE8",
        orange: "#FD5F09",
        lime: "#D0EE52",
        blueberry: "#B3A1CD",
      },
      fontFamily: {
        hand: ['"Mansalva"', "sans-serif"],
        sans: ['"Krona One"', "sans-serif"],
      },
      gridRow: {
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
      },
    },
  },
  plugins: [],
};
