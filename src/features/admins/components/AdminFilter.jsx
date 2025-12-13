// external imports
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { TableFilterSearchBar, FilterSelect, FilterContent, Menu } from '@components';
import { useAdminFilter } from '../hooks';
import AdminFilterActions from './AdminFilterActions';

/**
 * AdminFilter Component
 *
 * Single Responsibility: UI composition for admin filtering using reusable components
 * Filters are sent to backend via filterParams
 */
function AdminFilter({ onFilterChange, addButton }) {
  const { t } = useTranslation();

  // Filter state management - filters are sent to backend
  const {
    searchTerm,
    role,
    hasActiveFilters,
    showFilters,
    filterOptions,
    setSearchTerm,
    setRole,
    handleClearFilters,
    handleToggleFilters,
  } = useAdminFilter(onFilterChange);

  return (
    <Box>
      <Menu id="admin-filter-menu">
        {/* use the entire search bar as a menu trigger button */}
        <TableFilterSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t('admins.filter.searchPlaceholder')}
          endActions={
            <AdminFilterActions
              showFilters={showFilters}
              onToggleFilters={handleToggleFilters}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
              addButton={addButton}
              filterButtonWrapper={Menu.Trigger}
            />
          }
          showClearButton={false}
        />
        <Menu.Content
          minWidth={300}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <FilterContent>
            <FilterSelect
              label={t('admins.filter.role')}
              value={role}
              onChange={setRole}
              options={filterOptions.roles}
              allLabel={t('admins.filter.allRoles')}
            />
          </FilterContent>
        </Menu.Content>
      </Menu>
    </Box>
  );
}

AdminFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  addButton: PropTypes.node, // Optional: Add button to render in the same row
};

export default AdminFilter;
