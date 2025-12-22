import { useMemo } from 'react';

/**
 * useEffectiveRowCount Hook
 *
 * Single Responsibility: Calculate effective row count for pagination based on filter state
 * When filters are active, uses the actual filtered data length
 * When no filters are active, uses the total count from the server
 *
 * @param {Object} customFilters - Filter object from useTable/useDebouncedFilter
 * @param {number} dataLength - Length of the current filtered/displayed data
 * @param {number} totalCount - Total count from the server (unfiltered)
 * @returns {number} The effective row count to use for pagination
 */
export const useEffectiveRowCount = (customFilters = {}, dataLength = 0, totalCount = 0) => {
  return useMemo(() => {
    // Check if any filters are active
    const hasFilters = Object.keys(customFilters).some(
      (key) =>
        customFilters[key] !== undefined && customFilters[key] !== null && customFilters[key] !== ''
    );

    // Use filtered data length when filters are active, otherwise use total count
    return hasFilters ? dataLength : totalCount;
  }, [customFilters, dataLength, totalCount]);
};

export default useEffectiveRowCount;
