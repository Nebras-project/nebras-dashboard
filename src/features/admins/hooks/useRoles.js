// external imports
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchRoles } from '../services/rolesApi';
import { getRoleLabel } from '@utils/roleUtils';

/**
 * useRoles Hook
 *
 * Single Responsibility: Fetch roles as an array and provide role options
 *
 * @param {Object} options - Hook options
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with roles array, role options, and state
 */
export const useRoles = ({ enabled = true, onError } = {}) => {
  const { t } = useTranslation();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.ROLES],
    queryFn: fetchRoles,
    enabled,
    onError,
  });

  // Filter roles array to exclude "Admin" and "Student"
  const roles = useMemo(() => {
    const rolesArray = Array.isArray(data) ? data : [];
    return rolesArray.filter((roleItem) => {
      const roleStr = String(roleItem).toLowerCase();
      return roleStr !== 'general admin' && roleStr !== 'student';
    });
  }, [data]);

  // Convert filtered roles array to options format [{ value, label }]
  const roleOptions = useMemo(() => {
    return roles.map((roleItem) => ({
      value: roleItem,
      label: t ? getRoleLabel(roleItem, t) : roleItem,
    }));
  }, [roles, t]);

  // Return roles as array (default to empty array if data is undefined) and role options
  return {
    roles,
    roleOptions,
    isLoading,
    isError,
    error,
    refetch,
  };
};
