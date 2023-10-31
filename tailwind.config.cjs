const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        scriptina: ["Scriptina"],
        harrypotter: ["Harrypotter"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Scriptina",
          fontWheight: "300",
          src: "url(/fonts/scriptina.ttf)",
        },
      });
      addBase({
        "@font-face": {
          fontFamily: "Harrypotter",
          src: "url(/fonts/harryp.ttf)",
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        hedwig: {
          primary: "#000000",
          secondary: "#FFF",
          neutral: "#FFF",
        },
      },
      "dark",
    ],
  },
};
