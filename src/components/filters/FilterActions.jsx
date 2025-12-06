// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, useTheme } from '@mui/material';

// internal imports
import { Icon, IconButtonWithTooltip } from '@components';
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
  const theme = useTheme();
  const filterButton = (
    <Box component="div" sx={{ position: 'relative' }}>
      <IconButtonWithTooltip
        iconName="filterList"
        tooltip={showFilters ? t('common.hideFilters') : t('common.showFilters')}
        onClick={onToggleFilters}
        color={hasActiveFilters ? 'primary' : 'default'}
      />
      {hasActiveFilters && (
        <Box component="span" sx={{ position: 'absolute', top: 5, right: 2 }}>
          <Icon name="dot" size={16} color={theme.palette.primary.main} />
        </Box>
      )}
    </Box>
  );

  const Wrapper = filterButtonWrapper;
  const WrappedFilterButton = Wrapper ? <Wrapper>{filterButton}</Wrapper> : filterButton;

  return (
    <Stack direction="row" spacing={1}>
      {WrappedFilterButton}
      {showClearButton && hasActiveFilters && (
        <IconButtonWithTooltip iconName="clear" tooltip={clearAllLabel} onClick={onClearFilters} />
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
