// external imports
import { useState, useMemo } from 'react';
import { useDebouncedFilter } from '@components';

/**
 * useCompetitionFilter Hook
 *
 * Single Responsibility: Competition-specific filter state management
 * Uses useDebouncedFilter to handle all filters with debouncing
 * Provides filter params for backend API filtering as query string
 * Manages filter UI state (showFilters) and filter options extraction
 *
 * @param {Function} onFilterChange - Callback when filters change (receives filterParams as query string)
 * @param {Array} competitions - Competitions data for extracting filter options
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * @returns {Object} Filter state and handlers
 */
export const useCompetitionFilter = (onFilterChange, competitions = [], debounceMs = 500) => {
  const [showFilters, setShowFilters] = useState(false);

  // Use debounced filter for all filters (search, status, curriculum)
  const { filters, hasActiveFilters, updateFilter, clearAllFilters } = useDebouncedFilter(
    {
      competitionName: '',
      status: '',
      curriculum: '',
    },
    onFilterChange, // This will be called with cleaned params after debounce
    debounceMs
  );

  const searchTerm = filters.competitionName || '';
  const status = filters.status || '';
  const curriculum = filters.curriculum || '';

  // Get unique values for filter options from competitions data
  // Note: In a real app, these might come from a separate API endpoint
  const filterOptions = useMemo(() => {
    if (!competitions || competitions.length === 0) {
      return { statuses: [], curricula: [] };
    }

    const statuses = [...new Set(competitions.map((c) => c.preparationStatus))].filter(Boolean);
    const curricula = [...new Set(competitions.map((c) => c.curriculum))].filter(Boolean);

    return { statuses, curricula };
  }, [competitions]);

  // Convenience setters
  const setSearchTerm = (value) => updateFilter('competitionName', value);
  const setStatus = (value) => updateFilter('status', value);
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
    status,
    curriculum,
    // State
    hasActiveFilters,
    showFilters,
    // Filter options
    filterOptions,
    // Handlers
    setSearchTerm,
    setStatus,
    setCurriculum,
    handleClearFilters,
    handleToggleFilters,
  };
};
