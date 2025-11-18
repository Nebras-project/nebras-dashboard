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
    entityName,
    getItemName,
    onSuccess: (data) => onSuccess?.(data, 'create'),
    onError: (error, data) => onError?.(error, 'create'),
  });

  const { updateItem, isLoading: isUpdating } = useUpdate({
    updateFn,
    queryKey,
    entityName,
    getItemName,
    onSuccess: (data) => onSuccess?.(data, 'update'),
    onError: (error, data) => onError?.(error, 'update'),
  });

  const handleSubmit = useCallback(
    (formData) => {
      const { ConfirmPassword, ...submitData } = formData;

      if (isEdit && !submitData.Password) {
        delete submitData.Password;
      }

      if (isEdit) {
        updateItem({
          id: defaultValues.id,
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

