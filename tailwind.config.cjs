/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
            fontFamily: 'Scriptina',
            fontWheight: '300',
            src: 'url(fonts/scriptina.ttf)'
        }
      })
    }),
  ],
};
