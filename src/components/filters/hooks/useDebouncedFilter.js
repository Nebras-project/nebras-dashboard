// external imports
import { useState, useEffect } from 'react';
import { useFilter } from './useFilter';

/**
 * useDebouncedFilter Hook
 *
 * Single Responsibility: Filter hook with debouncing for search terms
 * Useful for search inputs to reduce API calls
 *
 * @param {Object} initialFilters - Initial filter values
 * @param {Function} onFilterChange - Callback when filters change (after debounce)
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * @returns {Object} Filter state and handlers
 */
export const useDebouncedFilter = (initialFilters = {}, onFilterChange, debounceMs = 500) => {
  const [debouncedFilters, setDebouncedFilters] = useState(() => initialFilters);
  const filterHook = useFilter(initialFilters);

  // Debounce filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filterHook.filters);
      if (onFilterChange) {
        onFilterChange(filterHook.filterParams);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [filterHook.filters, filterHook.filterParams, debounceMs, onFilterChange]);

  return {
    ...filterHook,
    debouncedFilters,
    debouncedFilterParams: filterHook.filterParams,
  };
};
