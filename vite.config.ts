import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const plugins = [
  react(),
  tailwindcss(),
  VitePWA({
    registerType: "autoUpdate",
    injectRegister: null,
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png"],
    manifest: {
      name: "Clinical Navigator — Recherche clinique",
      short_name: "Clinical Navigator",
      description: "Copilote méthodologique et opérationnel pour concevoir, vérifier et documenter des essais cliniques.",
      lang: "fr",
      start_url: "./",
      scope: "./",
      display: "standalone",
      background_color: "#f5f8f7",
      theme_color: "#0d2b36",
      icons: [
        { src: "./icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
        { src: "./icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
      sourcemap: process.env.VITE_PWA_SOURCEMAP === "true",
      navigateFallback: "./offline.html",
      globPatterns: [
        "assets/index-*.js",
        "assets/react-*.js",
        "assets/trpc-*.js",
        "assets/ui-*.js",
        "assets/clinicalContent-*.js",
        "assets/*.css",
        "offline.html",
        "manifest.webmanifest",
        "favicon.ico",
        "apple-touch-icon.png",
        "icon-*.png",
      ],
    },
  }),
];

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "wouter"],
          trpc: ["@tanstack/react-query", "@trpc/client", "@trpc/react-query", "superjson"],
          ui: ["lucide-react", "@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-tabs"],
          spreadsheet: ["xlsx"],
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
