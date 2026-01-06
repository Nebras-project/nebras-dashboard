// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { FilterActions } from '@components';
import { useTranslation } from '@hooks';

/**
 * ManagerFilterActions Component
 *
 * Single Responsibility: Manager-specific filter actions (toggle filters, clear, and add button)
 */
const ManagerFilterActions = memo(function ManagerFilterActions({
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  onClearFilters,
  actions,
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
        clearAllLabel={t('managers.filter.clearAll')}
        filterButtonWrapper={filterButtonWrapper}
      />
      {actions && <>{actions}</>}
    </Box>
  );
});

ManagerFilterActions.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  onToggleFilters: PropTypes.func.isRequired,
  hasActiveFilters: PropTypes.bool.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  actions: PropTypes.node, // Optional: Action buttons to render in the same row
  filterButtonWrapper: PropTypes.elementType, // Optional: Component to wrap the filter button
};

ManagerFilterActions.displayName = 'ManagerFilterActions';

export default ManagerFilterActions;
