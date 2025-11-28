import { useCallback } from 'react';

/**
 * Checks if the click target is an interactive element
 * @param {EventTarget} target - The event target element
 * @returns {boolean} True if the target is an interactive element
 */
const isInteractiveElement = (target) => {
  return (
    target.closest('button') ||
    target.closest('a') ||
    target.closest('[role="button"]') ||
    target.closest('[role="menuitem"]') ||
    target.closest('.MuiMenu-root') ||
    target.closest('.MuiPopover-root')
  );
};

/**
 * Custom hook that creates a click handler for clickable areas
 * Executes the callback only when clicking on non-interactive elements
 * Useful for cards, list items, table rows, or any clickable container
 */
const useClickableArea = (onClick) => {
  const handleClick = useCallback(
    (event) => {
      const target = event.target;
      if (!isInteractiveElement(target)) {
        onClick();
      }
    },
    [onClick]
  );

  return handleClick;
};

export default useClickableArea;
