// external imports
import { memo } from 'react';
import { Toast } from '@components';
import { useToast } from '@hooks';

/**
 * ToastContainer Component
 *
 * Single Responsibility: Manages toast state and renders Toast component
 */
const ToastContainer = memo(function ToastContainer() {
  // Don't forward action creators to <Toast /> (they end up on MUI <Snackbar /> root <div>)
  const {
    open,
    closeToast,
    showToast: _showToast,
    success: _success,
    warning: _warning,
    error: _error,
    info: _info,
    ...toastProps
  } = useToast();

  return <Toast open={open} onClose={closeToast} {...toastProps} />;
});

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
