/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1ECBE1'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
