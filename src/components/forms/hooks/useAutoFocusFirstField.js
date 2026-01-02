// external imports
import { useEffect, useRef } from 'react';

/**
 * Hook to automatically focus the first input field in a form
 *
 * Single Responsibility: Find and focus the first focusable input field when form opens
 *
 * @param {boolean} enabled - Whether auto-focus is enabled (e.g., when dialog is open)
 * @param {string} formId - Form ID to scope the search
 */
export const useAutoFocusFirstField = (open, formId) => {
  const hasFocusedRef = useRef(false);

  useEffect(() => {
    if (!open || hasFocusedRef.current) {
      return;
    }

    // Small delay to ensure form is fully rendered
    const timeoutId = setTimeout(() => {
      const form = formId ? document.getElementById(formId) : document.querySelector('form');
      if (!form) {
        return;
      }

      // Find the first focusable input field
      // Priority: text inputs, email, password, tel, number, textarea, select
      const focusableSelectors = [
        'input[type="text"]:not([disabled]):not([readonly])',
        'input[type="email"]:not([disabled]):not([readonly])',
        'input[type="password"]:not([disabled]):not([readonly])',
        'input[type="tel"]:not([disabled]):not([readonly])',
        'input[type="number"]:not([disabled]):not([readonly])',
        'textarea:not([disabled]):not([readonly])',
        'select:not([disabled])',
      ];

      for (const selector of focusableSelectors) {
        const firstInput = form.querySelector(selector);
        if (firstInput) {
          // Check if input is visible (not hidden by CSS)
          const isVisible = firstInput.offsetParent !== null;
          if (isVisible) {
            firstInput.focus();
            hasFocusedRef.current = true;
            return;
          }
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [open, formId]);

  // Reset focus flag when form closes
  useEffect(() => {
    if (!open) {
      hasFocusedRef.current = false;
    }
  }, [open]);
};
