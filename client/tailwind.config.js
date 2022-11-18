/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'hexagon': "url('/public/1-random-shifted-white-hexagon-honeycomb-geometrical-pattern-backg-shawn-hempel.jpg')",
        'blue-hex' : "url('/public/image.png')"
      }
    },
  },
  plugins: [],
}
