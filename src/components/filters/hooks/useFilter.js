// external imports
import { useState, useMemo, useCallback } from 'react';

/**
 * useFilter Hook
 *
 * Single Responsibility: Manage filter state for backend filtering
 * Does NOT perform client-side filtering - backend handles the logic
 *
 * @param {Object} initialFilters - Initial filter values
 * @param {Function} onFilterChange - Optional callback when filters change
 * @returns {Object} Filter state and handlers
 */
export const useFilter = (initialFilters = {}, onFilterChange) => {
  const [filters, setFilters] = useState(() => initialFilters);

  // Helper function to clean filter values (remove undefined/empty/null)
  const cleanFilters = useCallback((filtersToClean) => {
    const cleaned = {};
    Object.keys(filtersToClean).forEach((key) => {
      const value = filtersToClean[key];
      if (value !== undefined && value !== null && value !== '') {
        cleaned[key] = value;
      }
    });
    return cleaned;
  }, []);

  // Update a single filter
  const updateFilter = useCallback(
    (key, value) => {
      setFilters((prev) => {
        const newFilters = {
          ...prev,
          [key]: value === '' || value === null || value === undefined ? undefined : value,
        };

        // Clean filters before notifying parent
        const cleanedFilters = cleanFilters(newFilters);

        // Notify parent of filter change with cleaned params
        if (onFilterChange) {
          onFilterChange(cleanedFilters);
        }

        return newFilters;
      });
    },
    [onFilterChange, cleanFilters]
  );

  // Clear a single filter
  const clearFilter = useCallback(
    (key) => {
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[key];

        // Clean filters before notifying parent
        const cleanedFilters = cleanFilters(newFilters);

        // Notify parent of filter change with cleaned params
        if (onFilterChange) {
          onFilterChange(cleanedFilters);
        }

        return newFilters;
      });
    },
    [onFilterChange, cleanFilters]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters(initialFilters);

    // Clean initial filters before notifying parent
    const cleanedFilters = cleanFilters(initialFilters);

    // Notify parent of filter change with cleaned params
    if (onFilterChange) {
      onFilterChange(cleanedFilters);
    }
  }, [initialFilters, onFilterChange, cleanFilters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).some((key) => {
      const value = filters[key];
      return value !== '' && value !== null && value !== undefined;
    });
  }, [filters]);

  // Get filter params for API (removes undefined/empty values)
  const filterParams = useMemo(() => {
    const params = {};
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== undefined && value !== null && value !== '') {
        params[key] = value;
      }
    });
    return params;
  }, [filters]);

  return {
    filters,
    filterParams,
    hasActiveFilters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    setFilters,
  };
};
