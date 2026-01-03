// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchUnitById, fetchUnits } from '../services/unitsApi';
import { getUnitOptions } from '../utils';

/**
 * useUnits Hook
 *
 * Single Responsibility: Unit-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Unit ID to fetch (if provided, fetches single unit)
 * @param {string|number} options.gradeId - Grade ID to filter units (if provided)
 * @param {string|number} options.subjectId - Subject ID to filter units (if provided)
 * @param {string} options.queryString - Query string from useTable hook (only used when id is not provided)
 * @param {Object} options.params - Query parameters for list (deprecated, use queryString instead)
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with unit(s) data and state
 */
export const useUnits = ({
  id,
  gradeId,
  subjectId,
  unitId,
  queryString,
  params,
  enabled = true,
  onError,
} = {}) => {

  const effectiveUnitId = unitId || id;
  // Build getListFn - both gradeId and subjectId are now required for nested endpoints
  const getListFn =
    gradeId && subjectId
      ? () => fetchUnits(gradeId, subjectId, params)
      : () => {
          throw new Error('gradeId and subjectId are required to fetch units');
        };

  // Build getSingleFn - gradeId, subjectId, and unitId are required for nested endpoints
  const getSingleFn =
    effectiveUnitId && gradeId && subjectId
      ? () => fetchUnitById(gradeId, subjectId, effectiveUnitId)
      : () => {
          throw new Error('gradeId, subjectId, and unitId are required to fetch a unit');
        };

  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn,
    getListFn,
    id: effectiveUnitId,
    params: { gradeId, subjectId, ...(queryString ? { queryString } : params) },
    queryKey: [QUERY_KEYS.UNITS, gradeId, subjectId],
    entityName: 'units',
    enabled: enabled && !!gradeId && !!subjectId ,
    onError,
  });


  let unitOptions = [];
  if (!effectiveUnitId) {
    unitOptions = getUnitOptions(data.data);
  }
  // Return with unit-specific property names
  return {
    unit: effectiveUnitId ? data : undefined,
    units: effectiveUnitId ? undefined : data.data,
    unitOptions,
    isLoading,
    isError,
    error,
    refetch,
  };
};
