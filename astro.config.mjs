import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mitchellargamasilla.com",
  output: "static",
  trailingSlash: "always",
  build: { inlineStylesheets: "always" },
});
