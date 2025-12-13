// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { FilterActions } from '@components';
import { useTranslation } from '@hooks';

/**
 * AdminFilterActions Component
 *
 * Single Responsibility: Admin-specific filter actions (toggle filters, clear, and add button)
 */
const AdminFilterActions = memo(function AdminFilterActions({
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  onClearFilters,
  addButton,
  filterButtonWrapper,
}) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FilterActions
        showFilters={showFilters}
        onToggleFilters={onToggleFilters}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
        clearAllLabel={t('admins.filter.clearAll')}
        filterButtonWrapper={filterButtonWrapper}
      />
      {addButton && <>{addButton}</>}
    </Box>
  );
});

AdminFilterActions.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  onToggleFilters: PropTypes.func.isRequired,
  hasActiveFilters: PropTypes.bool.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  addButton: PropTypes.node, // Optional: Add button to render in the same row
  filterButtonWrapper: PropTypes.elementType, // Optional: Component to wrap the filter button
};

AdminFilterActions.displayName = 'AdminFilterActions';

export default AdminFilterActions;
