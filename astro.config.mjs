import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import nodejs from "@astrojs/node";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  site: "https://gdgpescara.github.io", // TODO: remove after setting the real deploy
  base: '/hedwig', // TODO: remove after setting the real deploy
  integrations: [react(), tailwind(),astroI18next()],
  output: "hybrid",
  adapter: nodejs({
    mode: "middleware",
  }),
});
