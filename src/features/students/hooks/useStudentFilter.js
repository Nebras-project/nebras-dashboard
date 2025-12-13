// external imports
import { useState, useMemo } from 'react';
import { useDebouncedFilter } from '@components';
import { useLanguage } from '@hooks';

// internal imports
import { useCurriculum } from '@features/curriculums/hooks';
import { getCurriculumOptions } from '@features/curriculums/utils';

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
  const { currentLanguage } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const { curriculums = [] } = useCurriculum();

  // Use debounced filter for all filters (search, curriculum)
  const { filters, hasActiveFilters, updateFilter, clearAllFilters } = useDebouncedFilter(
    {
      studentName: '',
      curriculum: '',
    },
    onFilterChange, // This will be called with cleaned params after debounce
    debounceMs
  );

  const searchTerm = filters.studentName || '';
  const curriculum = filters.curriculum || '';

  // Get curriculum options
  const curriculumOptions = useMemo(
    () => getCurriculumOptions(curriculums, currentLanguage),
    [curriculums, currentLanguage]
  );

  const filterOptions = useMemo(
    () => ({
      curriculums: curriculumOptions,
    }),
    [curriculumOptions]
  );

  // Convenience setters
  const setSearchTerm = (value) => updateFilter('studentName', value);
  const setCurriculum = (value) => updateFilter('curriculum', value);

  const handleClearFilters = () => {
    clearAllFilters();
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return {
    // Filter values (for controlled inputs)
    searchTerm,
    curriculum,
    // State
    hasActiveFilters,
    showFilters,
    // Filter options
    filterOptions,
    // Handlers
    setSearchTerm,
    setCurriculum,
    handleClearFilters,
    handleToggleFilters,
  };
};
