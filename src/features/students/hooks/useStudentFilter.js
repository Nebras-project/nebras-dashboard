// external imports
import { useState, useMemo } from 'react';
import { useDebouncedFilter } from '@components';

// internal imports
import { useGrade } from '@features/grades/hooks';

/**
 * useStudentFilter Hook
 *
 * Single Responsibility: Student-specific filter state management
 * Uses useDebouncedFilter to handle all filters with debouncing
 * Provides filter params for backend API filtering as query string
 * Manages filter UI state (showFilters) and filter options extraction
 *
 * @param {Function} onFilterChange - Callback when filters change (receives filterParams as query string)
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * @returns {Object} Filter state and handlers
 */
export const useStudentFilter = (onFilterChange, debounceMs = 500) => {
  const [showFilters, setShowFilters] = useState(false);
  const { gradeOptions } = useGrade();

  // Use debounced filter for all filters (search, curriculum)
  const { filters, hasActiveFilters, updateFilter, clearAllFilters } = useDebouncedFilter(
    {
      UserName: '',
      GradeId: '',
    },
    onFilterChange, // This will be called with cleaned params after debounce
    debounceMs
  );

  const searchTerm = filters.UserName || '';
  const gradeId = filters.GradeId || '';

  const filterOptions = useMemo(
    () => ({
      gradesId: gradeOptions,
    }),
    [gradeOptions]
  );

  // Convenience setters
  const setSearchTerm = (value) => updateFilter('UserName', value);
  const setGradeId = (value) => updateFilter('GradeId', value);

  const handleClearFilters = () => {
    clearAllFilters();
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return {
    // Filter values (for controlled inputs)
    searchTerm,
    gradeId,
    // State
    hasActiveFilters,
    showFilters,
    // Filter options
    filterOptions,
    // Handlers
    setSearchTerm,
    setGradeId,
    handleClearFilters,
    handleToggleFilters,
  };
};
