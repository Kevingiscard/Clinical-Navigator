// Runtime configuration for deployments that may not have a backend attached.
// VITE_API_BASE_URL can point to a separately deployed tRPC server.
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
export const STATIC_ONLY = import.meta.env.VITE_STATIC_ONLY === "true";
export const trpcUrl = `${API_BASE_URL}/api/trpc`;
