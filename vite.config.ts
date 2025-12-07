import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vite config for React app located in /client
export default defineConfig({
  root: "client",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src")
    }
  },
  server: {
    port: 5173
  },
  build: {
    outDir: "../dist"
  }
});
