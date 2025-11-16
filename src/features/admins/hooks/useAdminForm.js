// external imports
import { useMemo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation, useRole } from '@hooks';

// internal imports
import { filterRoleOptions } from '@utils/roleUtils';
import { createAdmin, updateAdmin } from '../services/adminsApi';

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
  const queryClient = useQueryClient();

  // Role options for admin selection - filtered based on current user role
  const roleOptions = useMemo(() => {
    const filteredRoles = filterRoleOptions(isOwner, isGeneralAdmin);
    return filteredRoles.map((value) => ({
      value,
      label: t(`admins.roles.${value}`),
    }));
  }, [t, isOwner, isGeneralAdmin]);

  // Default form values
  const formDefaultValues = useMemo(
    () => ({
      UserName: defaultValues.UserName || defaultValues.userName || '',
      Email: defaultValues.Email || defaultValues.email || '',
      PhoneNumber: defaultValues.PhoneNumber || defaultValues.phoneNumber || '',
      Role: defaultValues.Role || defaultValues.role || '',
      Password: '',
      ConfirmPassword: '',
      ProfileImg: defaultValues.ProfileImg || defaultValues.profileImage || null,
    }),
    [defaultValues]
  );

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      onSuccess?.(data, 'create');
    },
    onError: (error) => {
      onError?.(error, 'create');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAdmin(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      onSuccess?.(data, 'update');
    },
    onError: (error) => {
      onError?.(error, 'update');
    },
  });

  // Handle form submission
  const handleSubmit = useCallback(
    (formData) => {
      // Remove ConfirmPassword before submitting
      const { ConfirmPassword, ...submitData } = formData;

      // If editing and password is empty, remove it from submitData
      if (isEdit && !submitData.Password) {
        delete submitData.Password;
      }

      if (isEdit) {
        updateMutation.mutate({
          id: defaultValues.id,
          data: submitData,
        });
      } else {
        createMutation.mutate(submitData);
      }
    },
    [isEdit, defaultValues.id, createMutation, updateMutation]
  );

  return {
    roleOptions,
    formDefaultValues,
    handleSubmit,
    isLoading: createMutation.isPending || updateMutation.isPending,
    isError: createMutation.isError || updateMutation.isError,
    error: createMutation.error || updateMutation.error,
  };
};
