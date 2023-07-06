import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  // site: 'https://gdgpescara.github.io', // TODO: remove after setting the real deploy
  // base: '/hedwig', // TODO: remove after setting the real deploy
  integrations: [
    react(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
