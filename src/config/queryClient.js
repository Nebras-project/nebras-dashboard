import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetch data when window regains focus
      refetchOnWindowFocus: false,

      // Refetch data when network reconnects
      refetchOnReconnect: true,

      // Number of retry attempts for failed queries
      retry: 1,

      // Time in milliseconds before a query is considered stale
      staleTime: 5 * 60 * 1000, // 5 minutes

      // Time in milliseconds before inactive queries are garbage collected
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // Refetch interval (false = no automatic refetch)
      refetchInterval: false,

      // Suspense mode
      suspense: false,

      // Error handling
      onError: (error) => {
        console.error("Query Error:", error);
      },
    },

    mutations: {
      // Number of retry attempts for failed mutations
      retry: 0,

      // Error handling
      onError: (error) => {
        console.error("Mutation Error:", error);
      },
    },
  },
});

export default queryClient;
