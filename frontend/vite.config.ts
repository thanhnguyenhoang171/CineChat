import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss(), flowbiteReact()],
    server: {
      port: parseInt(env.PORT),
    },
    resolve: {
      alias: {
        "@": "/src",

        "@components": "/src/components",

        "@pages": "/src/pages",
      },
    },
  };
});
