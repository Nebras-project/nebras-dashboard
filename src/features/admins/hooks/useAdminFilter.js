// external imports
import { useDebouncedFilter } from '@components';

/**
 * useAdminFilter Hook
 *
 * Single Responsibility: Admin-specific filter state management
 * Uses useDebouncedFilter to handle all filters with debouncing
 * Provides filter params for backend API filtering as query string
 *
 * @param {Function} onFilterChange - Callback when filters change (receives filterParams as query string)
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * @returns {Object} Filter state and handlers
 */
export const useAdminFilter = (onFilterChange, debounceMs = 500) => {
  // Use debounced filter for search only
  const { filters, hasActiveFilters, updateFilter, clearAllFilters } = useDebouncedFilter(
    {
      adminName: '',
    },
    onFilterChange, // This will be called with cleaned params after debounce
    debounceMs
  );

  const searchTerm = filters.adminName || '';

  // Convenience setters
  const setSearchTerm = (value) => updateFilter('adminName', value);

  const handleClearFilters = () => {
    clearAllFilters();
  };

  return {
    // Filter values (for controlled inputs)
    searchTerm,
    // State
    hasActiveFilters,
    // Handlers
    setSearchTerm,
    handleClearFilters,
  };
};
