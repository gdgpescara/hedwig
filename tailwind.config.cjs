/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        hedwig: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#000000",
          "secondary": "#FFF",
          "neutral": "#FFF",
          "base-content": "#FFF"
        },
      },
    ],
  },
};
