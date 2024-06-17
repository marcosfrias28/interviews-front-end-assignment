import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/interviews-front-end-assignment/client",
  root: "client",
  build: {
    outDir: "../dist/client",
  },
});
