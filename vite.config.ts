import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const loadedEnv = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: loadedEnv.VITE_BASE_URL,
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    server: {
      port: loadedEnv.VITE_SERVER_PORT as unknown as number,
      strictPort: true,
      cors: loadedEnv.VITE_ALLOW_CORS as unknown as boolean,
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              const parts = id.toString().split("node_modules/")[1].split("/");
              if (parts[0].startsWith("@")) {
                return `vendor_${parts[0]}_${parts[1]}`;
              }
              return `vendor_${parts[0]}`;
            }
          },
        },
      },
    },
  };
});
