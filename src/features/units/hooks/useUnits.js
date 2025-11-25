// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchUnitById, fetchUnits } from '../services/unitsApi';

/**
 * useUnits Hook
 *
 * Single Responsibility: Unit-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Unit ID to fetch (if provided, fetches single unit)
 * @param {string|number} options.subjectId - Subject ID to filter units (if provided)
 * @param {string} options.queryString - Query string from useTable hook (only used when id is not provided)
 * @param {Object} options.params - Query parameters for list (deprecated, use queryString instead)
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with unit(s) data and state
 */
export const useUnits = ({
  id,
  curriculumId,
  subjectId,
  unitId,
  queryString,
  params,
  enabled = true,
  onError,
} = {}) => {
  // Build getListFn - both curriculumId and subjectId are now required for nested endpoints
  const getListFn =
    curriculumId && subjectId
      ? () => fetchUnits(curriculumId, subjectId, params)
      : () => {
          throw new Error('curriculumId and subjectId are required to fetch units');
        };

  // Build getSingleFn - curriculumId, subjectId, and unitId are required for nested endpoints
  const getSingleFn =
    id && curriculumId && subjectId
      ? () => fetchUnitById(curriculumId, subjectId, id)
      : () => {
          throw new Error('curriculumId, subjectId, and unitId are required to fetch a unit');
        };

  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn,
    getListFn,
    id: id || unitId,
    params: { curriculumId, subjectId, ...(queryString ? { queryString } : params) },
    queryKey: [QUERY_KEYS.UNITS, curriculumId, subjectId],
    entityName: 'units',
    enabled: enabled && !!curriculumId && !!subjectId,
    onError,
  });

  // Return with unit-specific property names
  if (id) {
    return {
      unit: data,
      units: undefined,
      isLoading,
      isError,
      error,
      refetch,
    };
  }

  return {
    unit: undefined,
    units: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
