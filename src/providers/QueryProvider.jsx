import PropTypes from 'prop-types';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { memo } from 'react';
import { queryClient } from '@config';

const QueryProvider = memo(function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools - Only visible in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
});

QueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QueryProvider;
