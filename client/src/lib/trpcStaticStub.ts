// Build-time stand-in for "@/lib/trpc" in static-only bundles (vite resolve.alias).
// In static mode every backend query is disabled and every mutation is guarded,
// so this stub returns inert hook results identical to a disabled query
// (data undefined, no error) without bundling the tRPC/React Query stack.
// Pages behind RequiresBackend keep showing their static unavailability notice.

const idleQuery = {
  data: undefined,
  dataUpdatedAt: 0,
  error: null,
  isError: false,
  isPending: false,
  isLoading: false,
  isSuccess: false,
  isFetching: false,
  isRefetching: false,
  isStale: false,
  status: "pending",
  fetchStatus: "idle",
  failureCount: 0,
  failureReason: null,
  refetch: () => Promise.resolve({}),
};

const idleMutation = {
  data: undefined,
  error: null,
  isError: false,
  isPending: false,
  isIdle: true,
  isPaused: false,
  isSuccess: false,
  status: "idle",
  failureCount: 0,
  failureReason: null,
  mutate: () => undefined,
  mutateAsync: () => Promise.resolve(undefined),
  reset: () => undefined,
};

const idleUtils = new Proxy({}, {
  get: () => () => Promise.resolve(undefined),
});

function makeProxy(): unknown {
  return new Proxy(function () {/* hook namespace */}, {
    get: (_target, prop) => {
      if (prop === "useQuery" || prop === "useSuspenseQuery" || prop === "useInfiniteQuery" || prop === "useQueries") {
        return () => idleQuery;
      }
      if (prop === "useMutation") return () => idleMutation;
      if (prop === "useUtils" || prop === "useContext") return () => idleUtils;
      if (prop === "Provider") return ({ children }: { children?: unknown }) => children ?? null;
      if (prop === "createClient") return () => ({});
      return makeProxy();
    },
  });
}

export const trpc = makeProxy() as never;
