// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper } from '@mui/material';

// internal imports
import ErrorIcon from './ErrorIcon';
import ErrorMessage from './ErrorMessage';
import ErrorActions from './ErrorActions';
import ErrorDetails from './ErrorDetails';
import { padding } from '@constants/spacing';
import { borderRadius } from '@theme';

// Style Getters
const getContainerStyles = () => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'background.default',
  ...padding.all.lg,
});

const getErrorBoxStyles = () => ({
  maxWidth: 700,
  width: '100%',
  ...padding.all.xl,
  textAlign: 'center',
  borderRadius: borderRadius.xs,
  boxShadow: 3,
});

const ErrorFallback = memo(function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box role="alert" aria-live="assertive" sx={getContainerStyles()}>
      <Paper elevation={3} sx={getErrorBoxStyles()}>
        <ErrorIcon />
        <ErrorMessage />
        <ErrorActions onReset={resetErrorBoundary} />
        <ErrorDetails error={error} />
      </Paper>
    </Box>
  );
});

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    stack: PropTypes.string,
    toString: PropTypes.func,
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

ErrorFallback.displayName = 'ErrorFallback';

export default ErrorFallback;
