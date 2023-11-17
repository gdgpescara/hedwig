import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import nodejs from "@astrojs/node";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  site: "https://devfest.gdgpescara.it",
  integrations: [react(), tailwind(), astroI18next()],
  output: "hybrid",
  adapter: nodejs({
    mode: "standalone",
  }),
});
