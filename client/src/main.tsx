import type { ReactNode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { STATIC_ONLY } from "./lib/runtime";
import "./index.css";

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).then(registration => {
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            worker.postMessage({ type: "SKIP_WAITING" });
          }
        });
      });
    }).catch(error => console.warn("[PWA] Service worker unavailable", error));
  });
}

async function bootstrap() {
  const rootElement = document.getElementById("root")!;
  // Static builds alias "@/lib/trpc" to an inert stub, so the full provider
  // stack (tRPC client, React Query, superjson) only loads when a backend exists.
  let tree: ReactNode = <App />;
  if (!STATIC_ONLY) {
    const { AppProviders, createAppQueryClient, createAppTrpcClient } = await import("./AppProviders");
    const queryClient = createAppQueryClient();
    const trpcClient = createAppTrpcClient();
    tree = (
      <AppProviders queryClient={queryClient} trpcClient={trpcClient}>
        <App />
      </AppProviders>
    );
  }
  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, tree);
  } else {
    createRoot(rootElement).render(tree);
  }
}

void bootstrap();
