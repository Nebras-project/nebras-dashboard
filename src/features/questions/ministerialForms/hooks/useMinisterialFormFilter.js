// external imports
import { useState } from 'react';
import { useDebouncedFilter } from '@components';

/**
 * useMinisterialFormFilter Hook
 *
 * Single Responsibility: MinisterialForm-specific filter state management
 * Uses useDebouncedFilter to handle year filter with debouncing
 * Provides filter params for backend API filtering as query string
 * Manages filter UI state (showFilters)
 *
 * @param {Function} onFilterChange - Callback when filters change (receives filterParams as query string)
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * @returns {Object} Filter state and handlers
 */
export const useMinisterialFormFilter = (onFilterChange, debounceMs = 500) => {
  const [showFilters, setShowFilters] = useState(false);

  // Use debounced filter for year only
  const { filters, hasActiveFilters, updateFilter, clearAllFilters } = useDebouncedFilter(
    {
      Year: '',
    },
    onFilterChange, // This will be called with cleaned params after debounce
    debounceMs
  );

  const year = filters.Year || '';

  // Convenience setter
  const setYear = (value) => updateFilter('Year', value);

  const handleClearFilters = () => {
    clearAllFilters();
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return {
    // Filter values (for controlled inputs)
    year,
    // State
    hasActiveFilters,
    showFilters,
    // Handlers
    setYear,
    handleClearFilters,
    handleToggleFilters,
  };
};
