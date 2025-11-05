// external imports
import { useFormContext } from 'react-hook-form';

/**
 * Hook to get error state for a form field
 *
 * Single Responsibility: Extract error state from React Hook Form context
 *
 * @param {string} name - Field name
 * @returns {Object} Error state object with `error`, `helperText`, and `errorMessage`
 */
export const useFormFieldError = (name) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage = error?.message;
  const hasError = !!error;

  return {
    error,
    hasError,
    errorMessage,
    helperText: errorMessage,
  };
};
