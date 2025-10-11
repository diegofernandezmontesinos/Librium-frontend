import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const loadedEnv = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: loadedEnv.VITE_BASE_URL,
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      port: Number(loadedEnv.VITE_SERVER_PORT),
      strictPort: true,
      cors: Boolean(loadedEnv.VITE_ALLOW_CORS),
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const parts = id.split("node_modules/")[1].split("/");
              return parts[0].startsWith("@")
                ? `vendor_${parts[0]}_${parts[1]}`
                : `vendor_${parts[0]}`;
            }
          },
        },
      },
    },
  };
});
