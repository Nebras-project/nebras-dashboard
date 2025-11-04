// external imports
import { useState, useCallback } from 'react';

/**
 * useConfirmDialog Hook
 *
 * Simple hook for managing confirmation dialog state
 * Returns dialog state and handlers
 */
export const useConfirmDialog = () => {
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    show,
    close,
  };
};

