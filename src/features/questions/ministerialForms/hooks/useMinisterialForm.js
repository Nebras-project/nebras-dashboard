// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchFormById, fetchForms } from '../services/formsApi';
import { getYearOptions } from '../utils';

/**
 * useMinisterialForm Hook
 *
 * Single Responsibility: MinisterialForm-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Form ID to fetch (if provided, fetches single form)
 * @param {string} options.queryString - Query string from useTable hook (only used when id is not provided)
 * @param {Object} options.params - Query parameters for list (pagination, sort, filter) - deprecated, use queryString instead
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with ministerial form(s) data and state
 */
export const useMinisterialForm = ({ id, queryString, params, enabled = true, onError } = {}) => {
  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn: fetchFormById,
    getListFn: fetchForms,
    id,
    params: queryString ? { queryString } : params,
    queryKey: [QUERY_KEYS.MINISTERIAL_FORMS],
    entityName: 'ministerialForm',
    enabled,
    onError,
  });

  let yearOptions = [];
  if (!id) {
    yearOptions = getYearOptions(data?.data || []);
  }
  // Return with ministerialForm-specific property names
  return {
    ministerialForm: id ? data : undefined,
    ministerialForms: id ? undefined : data?.data || [],
    totalCount: data?.totalCount || 0,
    yearOptions,
    isLoading,
    isError,
    error,
    refetch,
  };
};
