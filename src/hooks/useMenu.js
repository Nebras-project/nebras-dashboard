// external imports
import { useState, useCallback } from 'react';

export function useMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleToggle = useCallback((event) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  }, []);

  return {
    anchorEl,
    open,
    handleOpen,
    handleClose,
    handleToggle,
  };
}
