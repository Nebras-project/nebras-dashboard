// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import Message from './Message';

/**
 * Toast Component
 *
 * Single Responsibility: Brief, dismissible notification with optional title and content
 */
const Toast = memo(function Toast({
  open,
  onClose,
  title,
  content,
  message, // alias for content
  autoHideDuration = 4000,
  variant = 'success',
  sx,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
  ...snackbarProps
}) {
  const body = content ?? message;

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      {...snackbarProps}
    >
      <Alert onClose={onClose} severity={variant} sx={sx} variant="standard">
        {title ? <AlertTitle>{title}</AlertTitle> : null}
        {body ? <Message content={body} /> : null}
      </Alert>
    </Snackbar>
  );
});

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  autoHideDuration: PropTypes.number,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  sx: PropTypes.object,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'bottom']).isRequired,
    horizontal: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
  }),
};

Toast.displayName = 'Toast';

export default Toast;
