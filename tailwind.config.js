module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    width: {
      450: "450px",
    },
    color: {
      black: "#1c1917"
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
