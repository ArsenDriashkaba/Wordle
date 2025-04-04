import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      proxy: {
        "/wordle": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/wordle/, ""),
        },
      },
    },
    plugins: [react(), tailwindcss()],
  };
});
