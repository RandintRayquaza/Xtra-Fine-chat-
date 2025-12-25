import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
