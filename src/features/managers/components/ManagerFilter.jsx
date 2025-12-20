// external imports
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { TableFilterSearchBar, FilterSelect, FilterContent, Menu } from '@components';
import { useManagerFilter } from '../hooks';
import ManagerFilterActions from './ManagerFilterActions';

/**
 * ManagerFilter Component
 *
 * Single Responsibility: UI composition for manager filtering using reusable components
 * Filters are sent to backend via filterParams
 */
function ManagerFilter({ onFilterChange, addButton }) {
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
  } = useManagerFilter(onFilterChange);

  return (
    <Box>
      <Menu id="manager-filter-menu">
        {/* use the entire search bar as a menu trigger button */}
        <TableFilterSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t('managers.filter.searchPlaceholder')}
          endActions={
            <ManagerFilterActions
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
              label={t('managers.filter.role')}
              value={role}
              onChange={setRole}
              options={filterOptions.roles}
              allLabel={t('managers.filter.allRoles')}
            />
          </FilterContent>
        </Menu.Content>
      </Menu>
    </Box>
  );
}

ManagerFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  addButton: PropTypes.node, // Optional: Add button to render in the same row
};

export default ManagerFilter;
