// external imports
import { memo, useCallback } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

// internal imports
import ErrorFallback from './ErrorFallback';
import { logError } from '@utils';

const ErrorBoundary = memo(function ErrorBoundary({
  children,
  onError,
  onReset,
  resetKeys = [],
  FallbackComponent = ErrorFallback,
}) {
  const handleError = useCallback(
    (error, errorInfo) => {
      logError(error, errorInfo);

      if (onError) {
        onError(error, errorInfo);
      }
    },
    [onError]
  );

  const handleReset = useCallback(
    (...args) => {
      if (onReset) {
        onReset(...args);
      }
    },
    [onReset]
  );

  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={handleError}
      onReset={handleReset}
      resetKeys={resetKeys}
    >
      {children}
    </ReactErrorBoundary>
  );
});

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func,
  onReset: PropTypes.func,
  resetKeys: PropTypes.array,
  FallbackComponent: PropTypes.elementType,
};

ErrorBoundary.displayName = 'ErrorBoundary';

export default ErrorBoundary;
