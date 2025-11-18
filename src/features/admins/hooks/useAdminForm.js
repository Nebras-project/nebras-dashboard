// external imports
import { useMemo } from 'react';
import { useTranslation, useRole } from '@hooks';
import { useEntityForm } from '@components/forms/hooks';

// internal imports
import { buildBaseUserDefaultValues } from '@components/forms/utils';
import { buildRoleOptions } from '@utils/roleUtils';
import { QUERY_KEYS } from '@config';
import { createAdmin, updateAdmin } from '../services/adminsApi';
import { getAdminName } from '../utils';

/**
 * useAdminForm Hook
 *
 * Single Responsibility: Manage admin form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */
export const useAdminForm = ({ defaultValues = {}, isEdit = false, onSuccess, onError } = {}) => {
  const { t } = useTranslation();
  const { isOwner, isGeneralAdmin } = useRole();

  // Role options for admin selection - filtered based on current user role
  const roleOptions = useMemo(
    () => buildRoleOptions(t, isOwner, isGeneralAdmin),
    [t, isOwner, isGeneralAdmin]
  );

  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: QUERY_KEYS.ADMINS,
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createAdmin,
    updateFn: ({ id, data }) => updateAdmin(id, data),
    buildDefaultValues: (values) => ({
      ...buildBaseUserDefaultValues(values),
      Role: values.Role || values.role || '',
    }),
    entityName: 'admins',
    getItemName: (data) => {
      const name = getAdminName(data);
      return name !== 'N/A' ? name : 'Admin';
    },
  });

  return {
    roleOptions,
    formDefaultValues,
    handleSubmit,
    isLoading,
    isError,
    error,
  };
};
