import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // importante pra rodar acessível na rede
    port: 8080,
    strictPort: true,
    allowedHosts: ["hackhub.impulse8.com.br"], // o domínio EXATO
    cors: true, // garante que Vite permita requests
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
