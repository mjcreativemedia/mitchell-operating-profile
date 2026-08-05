import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mitchell-operating-profile.mitch144.chatgpt.site",
  output: "static",
  trailingSlash: "never",
  build: { inlineStylesheets: "always" },
});
