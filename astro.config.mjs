import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import nodejs from "@astrojs/node";
import astroI18next from "astro-i18next";
import icon from "astro-icon";
import { defaultLanguage, supportedLanguages } from "~/constants/i18n.js";

// https://astro.build/config
export default defineConfig({
  site: "https://devfest.gdgpescara.it",
  integrations: [
    icon({
      include: {
        mdi: ["*"], // (Default) Loads entire Material Design Icon set
      },
    }),
    react(),
    tailwind(),
    astroI18next(),
  ],
  output: "hybrid",
  adapter: nodejs({
    mode: "standalone",
  }),
  image: {
    domains: ["via.placeholder.com"],
  },
  i18n: {
    defaultLocale: defaultLanguage,
    locales: supportedLanguages,
    fallback: {
      it: defaultLanguage,
    },
    routingStrategy: "prefix-other-locales",
  },
  vite: {
    resolve: {
      alias: {
        "~/": "/src/",
      },
    },
  },
});
