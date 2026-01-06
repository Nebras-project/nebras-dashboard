// external imports
import { useState, useMemo } from 'react';
import { useDebouncedFilter } from '@components';

// internal imports
import { useGrade } from '@features/grades/hooks';
import { useSubjects } from '@features/subjects/hooks';
import { useMinisterialForm } from './useMinisterialForm';

/**
 * useMinisterialFormFilter Hook
 *
 * Single Responsibility: MinisterialForm-specific filter state management
 * Uses useDebouncedFilter to handle year, gradeId, and subjectId filters with debouncing
 * Provides filter params for backend API filtering as query string
 * Manages filter UI state (showFilters)
 *
 * @param {Function} onFilterChange - Callback when filters change (receives filterParams as query string)
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * @returns {Object} Filter state and handlers
 */
export const useMinisterialFormFilter = (onFilterChange, debounceMs = 500) => {
  const [showFilters, setShowFilters] = useState(false);

  // Use debounced filter for year, gradeId, and subjectId
  const { filters, hasActiveFilters, updateFilter, clearAllFilters } = useDebouncedFilter(
    {
      Year: '',
      GradeId: '',
      SubjectId: '',
    },
    onFilterChange, // This will be called with cleaned params after debounce
    debounceMs
  );

  const year = filters.Year || '';
  const gradeId = filters.GradeId || '';
  const subjectId = filters.SubjectId || '';

  // Fetch grades for filter options
  const { gradeOptions = [], isLoading: isLoadingGrades } = useGrade();

  // Fetch subjects based on selected grade (if grade is selected)
  const { subjectOptions = [], isLoading: isLoadingSubjects } = useSubjects({
    gradeId,
    enabled: !!gradeId,
  });

  const { yearOptions = [], isLoading: isLoadingYears } = useMinisterialForm();

  const filterOptions = useMemo(
    () => ({
      grades: gradeOptions,
      subjects: subjectOptions,
      years: yearOptions,
    }),
    [gradeOptions, subjectOptions, yearOptions]
  );

  // Convenience setters
  const setYear = (value) => updateFilter('Year', value);
  const setGradeId = (value) => {
    updateFilter('GradeId', value);
    // Clear subjectId when grade changes
    if (value) {
      updateFilter('SubjectId', '');
    }
  };
  const setSubjectId = (value) => updateFilter('SubjectId', value);

  const handleClearFilters = () => {
    clearAllFilters();
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return {
    // Filter values (for controlled inputs)
    year,
    gradeId,
    subjectId,
    // State
    hasActiveFilters,
    showFilters,
    // Filter options
    filterOptions,
    // Loading states
    isLoadingGrades,
    isLoadingSubjects,
    isLoadingYears,
    // Handlers
    setYear,
    setGradeId,
    setSubjectId,
    handleClearFilters,
    handleToggleFilters,
  };
};
