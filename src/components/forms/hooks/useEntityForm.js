// external imports
import { useCallback, useMemo } from 'react';

// internal imports
import { useCreate, useUpdate } from '@hooks';

/**
 * useEntityForm
 *
 * Generic hook for entity forms (admins, students, levels, subjects, ...).
 * It centralizes:
 * - default values building
 * - create/update mutations (using useCreate and useUpdate hooks)
 * - common submit logic (ConfirmPassword removal, optional Password)
 *
 * The caller is responsible for providing entity-specific pieces via options.
 *
 * @param {Object} options
 * @param {string} options.queryKey - React Query key to invalidate (e.g. 'admins')
 * @param {string|Array} options.additionalQueryKeys - Additional React Query key(s) to invalidate
 * @param {Object} options.defaultValues - Raw default values from the caller (record to edit)
 * @param {boolean} options.isEdit - Whether this is edit mode
 * @param {Function} options.onSuccess - Called with (data, action)
 * @param {Function} options.onError - Called with (error, action)
 * @param {Function} options.createFn - Function to create entity (data) => Promise
 * @param {Function} options.updateFn - Function to update entity ({ id, data }) => Promise
 * @param {Function} options.buildDefaultValues - Function mapping raw values -> formDefaultValues
 * @param {string} options.entityName - Entity name for translations
 * @param {Function} options.getItemName - Function to extract item name from data
 */
export const useEntityForm = ({
  queryKey,
  additionalQueryKeys,
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
  createFn,
  updateFn,
  buildDefaultValues,
  entityName,
  getItemName,
} = {}) => {
  const formDefaultValues = useMemo(
    () => (buildDefaultValues ? buildDefaultValues(defaultValues) : defaultValues),
    [defaultValues, buildDefaultValues]
  );

  const { createItem, isLoading: isCreating } = useCreate({
    createFn,
    queryKey,
    additionalQueryKeys,
    entityName,
    getItemName,
    onSuccess: (data) => onSuccess?.(data, 'create'),
    onError: (error, _data) => onError?.(error, 'create'),
  });

  const { updateItem, isLoading: isUpdating } = useUpdate({
    updateFn,
    queryKey,
    additionalQueryKeys,
    entityName,
    getItemName,
    onSuccess: (data) => onSuccess?.(data, 'update'),
    onError: (error, _data) => onError?.(error, 'update'),
  });

  const handleSubmit = useCallback(
    (formData) => {
      const { confirmPassword, ...submitData } = formData;

      // Remove spaces from phone number before sending (spaces are only for display)
      if (submitData.phoneNumber && typeof submitData.phoneNumber === 'string') {
        submitData.phoneNumber = submitData.phoneNumber.replace(/\s/g, '');
      }

      // If email is verified, don't send sendVerificationEmail
      if (submitData.verifyEmail) {
        delete submitData.sendVerificationEmail;
      }

      // In edit mode, if password is empty, remove it from submit data
      if (isEdit && !submitData.password) {
        delete submitData.password;
      }

      if (isEdit) {
        updateItem({
          id: defaultValues.userId || defaultValues.id,
          data: submitData,
        });
      } else {
        createItem(submitData);
      }
    },
    [isEdit, defaultValues.id, createItem, updateItem]
  );

  return {
    formDefaultValues,
    handleSubmit,
    isLoading: isCreating || isUpdating,
    isError: false, // Errors are handled by hooks
    error: null,
  };
};
