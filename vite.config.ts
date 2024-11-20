import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    define: {
      env: {
        react16AppHost: env.VITE_REACT_16_APP,
        react18AppHost: env.VITE_REACT_18_APP,
        vueNavAppHost: env.VITE_VUE_NAV_APP,
      },
    },
  };
});
