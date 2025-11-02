// external imports
import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { IS_DEV } from '@config';
import { margin, padding } from '@constants/spacing';

// Style Getters
const getDetailsContainerStyles = () => ({
  ...margin.top.xl,
  ...padding.all.md,
  bgcolor: 'grey.100',
  borderRadius: 1,
  textAlign: 'left',
  overflow: 'auto',
  maxHeight: '300px',
});

const getErrorMessageStyles = () => ({
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontSize: '0.75rem',
  color: 'error.main',
  ...margin.bottom.sm,
});

const getStackTraceStyles = () => ({
  ...margin.top.md,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontSize: '0.7rem',
  color: 'text.secondary',
  fontFamily: 'monospace',
});

const ErrorDetails = memo(function ErrorDetails({ error }) {
  if (!IS_DEV || !error) {
    return null;
  }

  return (
    <Box sx={getDetailsContainerStyles()}>
      <Typography variant="subtitle2" color="error" gutterBottom>
        Error Details (Development Only):
      </Typography>

      <Typography variant="body2" component="pre" sx={getErrorMessageStyles()}>
        {error.toString()}
      </Typography>

      {error.stack && (
        <Typography variant="body2" component="pre" sx={getStackTraceStyles()}>
          {error.stack}
        </Typography>
      )}
    </Box>
  );
});

ErrorDetails.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    stack: PropTypes.string,
    toString: PropTypes.func,
  }),
};

ErrorDetails.displayName = 'ErrorDetails';

export default ErrorDetails;
