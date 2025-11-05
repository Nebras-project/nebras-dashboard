// external imports
import { useCallback, useId, useMemo } from 'react';
import { useForm } from 'react-hook-form';

// internal imports
import { useTranslation } from '@hooks';

/**
 * Hook for form setup and configuration
 *
 * Single Responsibility: Centralize form initialization, submit handler, and context creation
 *
 * @param {Object} options - Form setup options
 * @param {Object} options.defaultValues - Default form values
 * @param {Function} options.onSubmit - Submit handler
 * @param {Object} options.formProps - Additional react-hook-form options
 * @param {string} options.mode - Form mode ('dialog' | 'page')
 * @param {string} options.title - Form title
 * @param {boolean} options.showCloseButton - Show close button
 * @param {Function} options.onClose - Close handler
 * @returns {Object} Form setup object with methods, formId, handlers, and context value
 */
export const useFormSetup = ({
  defaultValues = {},
  onSubmit,
  formProps = {},
  mode,
  title,
  showCloseButton,
  onClose,
}) => {
  const { t } = useTranslation();
  const formId = useId();

  // Setup React Hook Form
  const methods = useForm({
    defaultValues,
    ...formProps,
  });

  const handleSubmit = useCallback(
    (data) => {
      onSubmit?.(data, methods);
    },
    [onSubmit, methods]
  );

  // Form context value
  const contextValue = useMemo(
    () => ({
      mode,
      title,
      formId,
      showCloseButton,
      onClose,
      t,
    }),
    [mode, title, formId, showCloseButton, onClose, t]
  );

  return {
    methods,
    formId,
    t,
    handleSubmit,
    contextValue,
  };
};
