// external imports
import { useState, useMemo } from 'react';
import { useDebouncedFilter } from '@components';
import { useTranslation } from '@hooks';
import { useRole } from '@hooks';

// internal imports
import { buildRoleOptions } from '@utils/roleUtils';

/**
 * useAdminFilter Hook
 *
 * Single Responsibility: Admin-specific filter state management
 * Uses useDebouncedFilter to handle all filters with debouncing
 * Provides filter params for backend API filtering as query string
 * Manages filter UI state (showFilters) and filter options extraction
 *
 * @param {Function} onFilterChange - Callback when filters change (receives filterParams as query string)
 * @param {Array} admins - Admins data for extracting filter options (optional)
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * @returns {Object} Filter state and handlers
 */
export const useAdminFilter = (onFilterChange, debounceMs = 500) => {
  const { t } = useTranslation();
  const { isOwner, isGeneralAdmin } = useRole();
  const [showFilters, setShowFilters] = useState(false);

  // Use debounced filter for all filters (search, role)
  const { filters, hasActiveFilters, updateFilter, clearAllFilters } = useDebouncedFilter(
    {
      adminName: '',
      role: '',
    },
    onFilterChange, // This will be called with cleaned params after debounce
    debounceMs
  );

  const searchTerm = filters.adminName || '';
  const role = filters.role || '';

  // Get role options based on user permissions
  const roleOptions = useMemo(
    () => buildRoleOptions(t, isOwner, isGeneralAdmin),
    [t, isOwner, isGeneralAdmin]
  );

  const filterOptions = useMemo(
    () => ({
      roles: roleOptions,
    }),
    [roleOptions]
  );

  // Convenience setters
  const setSearchTerm = (value) => updateFilter('adminName', value);
  const setRole = (value) => updateFilter('role', value);

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
