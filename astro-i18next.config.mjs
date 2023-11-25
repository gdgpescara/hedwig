/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: "en",
  locales: ["en", "it"],
  defaultNamespace: "common",
  namespaces: ["common", "landing", "agenda", "coc", "location", "team"],
  i18nextServer: {
    debug: true,
  },
};
