// external imports
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { TableFilterSearchBar } from '@components';
import { useAdminFilter } from '../hooks';
import AdminFilterActions from './AdminFilterActions';

/**
 * AdminFilter Component
 *
 * Single Responsibility: UI composition for admin filtering using reusable components
 * Filters are sent to backend via filterParams
 */
function AdminFilter({ onFilterChange, actions }) {
  const { t } = useTranslation();

  // Filter state management - filters are sent to backend
  const { searchTerm, hasActiveFilters, setSearchTerm, handleClearFilters } =
    useAdminFilter(onFilterChange);

  return (
    <Box>
      <TableFilterSearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={t('admins.filter.searchPlaceholder')}
        endActions={
          <AdminFilterActions
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
            actions={actions}
          />
        }
        showClearButton={false}
      />
    </Box>
  );
}

AdminFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  actions: PropTypes.node, // Optional: Action buttons to render in the same row
};

export default AdminFilter;
