// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';

// internal imports
import { IconButtonWithTooltip } from '@components';
import { useTranslation } from '@hooks';

/**
 * FilterActions Component
 *
 * Single Responsibility: Reusable filter toggle and clear buttons
 */
const FilterActions = memo(function FilterActions({
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  onClearFilters,
  clearAllLabel = 'Clear all filters',
  showClearButton = true,
  filterButtonWrapper,
}) {
  const { t } = useTranslation();
  const filterButton = (
    <Box component="div" sx={{ position: 'relative' }}>
      <IconButtonWithTooltip
        iconName="filterOutline"
        tooltip={showFilters ? t('common.hideFilters') : t('common.showFilters')}
        onClick={onToggleFilters}
        text={t('common.filter')}
      />
    </Box>
  );

  const Wrapper = filterButtonWrapper;
  const WrappedFilterButton = Wrapper ? <Wrapper>{filterButton}</Wrapper> : filterButton;

  return (
    <Stack direction="row" alignItems="center">
      {WrappedFilterButton}
      {showClearButton && hasActiveFilters && (
        <IconButtonWithTooltip
          iconName="clear"
          tooltip={clearAllLabel}
          onClick={onClearFilters}
          text={t('common.clear')}
          size={24}
          color="error"
        />
      )}
    </Stack>
  );
});

FilterActions.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  onToggleFilters: PropTypes.func.isRequired,
  hasActiveFilters: PropTypes.bool.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  clearAllLabel: PropTypes.string,
  showClearButton: PropTypes.bool,
  filterButtonWrapper: PropTypes.elementType, // Component to wrap the filter button (e.g., Menu.Trigger)
};

FilterActions.displayName = 'FilterActions';

export default FilterActions;
