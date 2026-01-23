// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchFormById, fetchForms } from '../services/formsApi';
import { getFormOptions, getYearOptions } from '../utils';

/**
 * useMinisterialForm Hook
 *
 * Single Responsibility: MinisterialForm-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Form ID to fetch (if provided, fetches single form)
 * @param {string} options.queryString - Query string from useTable hook (only used when id is not provided)
 * @param {string|number} options.subjectId - Optional subject ID to filter forms when no queryString is provided
 * @param {Object} options.params - Query parameters for list (pagination, sort, filter) - deprecated, use queryString instead
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with ministerial form(s) data and state
 */
export const useMinisterialForm = ({
  id,
  queryString,
  subjectId,
  params,
  enabled = true,
  onError,
} = {}) => {
  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn: fetchFormById,
    getListFn: fetchForms,
    id,
    // Prefer explicit queryString from callers (e.g., useTable). If absent and subjectId is provided,
    // build a minimal queryString to filter by SubjectId.
    params: queryString
      ? { queryString }
      : subjectId
      ? { queryString: new URLSearchParams({ SubjectId: String(subjectId) }).toString() }
      : params,
    queryKey: [QUERY_KEYS.MINISTERIAL_FORMS],
    entityName: 'ministerialForm',
    enabled,
    onError,
  });

  let yearOptions = [];
  let formOptions = [];
  if (!id) {
    yearOptions = getYearOptions(data?.data || []);
    formOptions = getFormOptions(data?.data || []);
  }
  // Return with ministerialForm-specific property names
  return {
    ministerialForm: id ? data : undefined,
    ministerialForms: id ? undefined : data?.data || [],
    totalCount: data?.totalCount || 0,
    yearOptions,
    formOptions,
    isLoading,
    isError,
    error,
    refetch,
  };
};
