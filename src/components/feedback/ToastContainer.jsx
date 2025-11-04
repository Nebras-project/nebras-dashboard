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
  const { open, closeToast, ...toastProps } = useToast();

  return <Toast open={open} onClose={closeToast} {...toastProps} />;
});

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
