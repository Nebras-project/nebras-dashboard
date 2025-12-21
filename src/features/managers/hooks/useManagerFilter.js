// external imports
import { useState, useMemo } from 'react';
import { useDebouncedFilter } from '@components';

// internal imports
import { useRoles } from '../../admins/hooks/useRoles';

/**
 * useManagerFilter Hook
 *
 * Single Responsibility: Manager-specific filter state management
 * Uses useDebouncedFilter to handle all filters with debouncing
 * Provides filter params for backend API filtering as query string
 * Manages filter UI state (showFilters) and filter options extraction
 *
 * @param {Function} onFilterChange - Callback when filters change (receives filterParams as query string)
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * @returns {Object} Filter state and handlers
 */
export const useManagerFilter = (onFilterChange, debounceMs = 500) => {
  const [showFilters, setShowFilters] = useState(false);
  const { roleOptions } = useRoles();

  // Use debounced filter for all filters (search, role)
  const { filters, hasActiveFilters, updateFilter, clearAllFilters } = useDebouncedFilter(
    {
      UserName: '',
      Roles: '',
    },
    onFilterChange, // This will be called with cleaned params after debounce
    debounceMs
  );

  const searchTerm = filters.UserName || '';
  const role = filters.Roles || '';

  const filterOptions = useMemo(
    () => ({
      roles: roleOptions,
    }),
    [roleOptions]
  );

  // Convenience setters
  const setSearchTerm = (value) => updateFilter('UserName', value);
  const setRole = (value) => updateFilter('Roles', value);

  const handleClearFilters = () => {
    clearAllFilters();
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return {
    // Filter values (for controlled inputs)
    searchTerm,
    role,
    // State
    hasActiveFilters,
    showFilters,
    // Filter options
    filterOptions,
    // Handlers
    setSearchTerm,
    setRole,
    handleClearFilters,
    handleToggleFilters,
  };
};
