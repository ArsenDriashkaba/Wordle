import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/wordle": {
        target: "https://api.frontendexpert.io",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wordle/, ""),
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
