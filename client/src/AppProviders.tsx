import { trpc } from "@/lib/trpc";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import type { ReactNode } from "react";
import superjson from "superjson";
import { startLogin } from "./const";
import { STATIC_ONLY, trpcUrl } from "./lib/runtime";

// Shared provider stack used by the browser entry (main.tsx) and by the static
// prerender (entry-server.tsx). In STATIC_ONLY builds every query is disabled,
// so creating the client never triggers a network request.

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (STATIC_ONLY) return;
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  startLogin();
};

export function createAppQueryClient() {
  const queryClient = new QueryClient();

  queryClient.getQueryCache().subscribe(event => {
    if (event.type === "updated" && event.action.type === "error") {
      const error = event.query.state.error;
      redirectToLoginIfUnauthorized(error);
      console.error("[API Query Error]", error);
    }
  });

  queryClient.getMutationCache().subscribe(event => {
    if (event.type === "updated" && event.action.type === "error") {
      const error = event.mutation.state.error;
      redirectToLoginIfUnauthorized(error);
      console.error("[API Mutation Error]", error);
    }
  });

  return queryClient;
}

export function createAppTrpcClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: trpcUrl,
        transformer: superjson,
        headers() {
          // Preview auto-login fallback: when the browser blocks iframe cookies
          // (Safari ITP / private browsing / WebView), the runtime mirrors the
          // session into sessionStorage so we can forward it as a Bearer token.
          // The regular OAuth cookie flow keeps working and takes priority server-side.
          try {
            const raw = sessionStorage.getItem("clinical-navigator-session-cookie");
            if (raw) {
              const prefix = `${COOKIE_NAME}=`;
              const pair = raw.split(";").find(s => s.trim().startsWith(prefix));
              const token = pair?.trim().slice(prefix.length);
              if (token) {
                return { Authorization: `Bearer ${token}` };
              }
            }
          } catch {
            // sessionStorage unavailable (server prerender, blocked storage)
          }
          return {};
        },
        fetch(input, init) {
          return globalThis.fetch(input, {
            ...(init ?? {}),
            credentials: "include",
          });
        },
      }),
    ],
  });
}

export function AppProviders({ queryClient, trpcClient, children }: { queryClient: QueryClient; trpcClient: ReturnType<typeof createAppTrpcClient>; children: ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
