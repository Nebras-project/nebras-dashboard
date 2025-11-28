import { QueryClient } from '@tanstack/react-query';
import { store } from '@store';
import { error as showErrorToast } from '@store/slices';
import { logError, formatErrorMessage } from '@utils';
import i18n from '@i18n';

/**
 * Central definition of React Query keys used across the app.
 *
 * Keeping them next to the queryClient makes it easy
 * to manage cache namespaces and invalidation.
 */
export const QUERY_KEYS = {
  ADMINS: 'admins',
  STUDENTS: 'students',
  COMPETITIONS: 'competitions',
  QUESTIONS: 'questions',
  CURRICULUMS: 'curriculums',
  SUBJECTS: 'subjects',
  UNITS: 'units',
  LESSONS: 'lessons',
};

/**
 * Global error handler for queries
 *
 * This is a fallback handler that only runs if no local onError handler is provided.
 * Since we use useEntity hook which has its own onError, this mainly serves as
 * a safety net for direct useQuery calls or edge cases.
 *
 * @param {Error} error - The error object
 */
const handleQueryError = (error) => {
  // Log error for debugging
  logError(error, {
    context: 'React Query',
    type: 'query',
    timestamp: new Date().toISOString(),
  });

  // Generic error message
  const genericMessage = i18n.t('common.fetchErrorMessage', {
    defaultValue: 'حدث خطأ أثناء جلب البيانات',
    entityName: i18n.t('common.data', { defaultValue: 'البيانات' }),
  });

  // Format message with API error details if available
  const errorMessage = formatErrorMessage(genericMessage, error);

  store.dispatch(
    showErrorToast({
      message: errorMessage,
    })
  );
};

// Global error handler for mutations

const handleMutationError = (error) => {
  logError(error, {
    context: 'React Query',
    type: 'mutation',
    timestamp: new Date().toISOString(),
  });

  // Generic error message
  const genericMessage = i18n.t('common.mutationErrorMessage', {
    defaultValue: 'حدث خطأ أثناء تنفيذ العملية',
  });

  // Format message with API error details if available
  const errorMessage = formatErrorMessage(genericMessage, error);

  store.dispatch(
    showErrorToast({
      message: errorMessage,
    })
  );
};

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

      // Global error handling - fallback for queries without local onError
      onError: handleQueryError,
    },

    mutations: {
      // Number of retry attempts for failed mutations
      retry: 0,

      // Global error handling - fallback for mutations without local onError
      onError: handleMutationError,
    },
  },
});

export default queryClient;
