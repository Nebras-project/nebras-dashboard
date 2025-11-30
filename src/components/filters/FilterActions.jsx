// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';

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
}) {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={1}>
      <IconButtonWithTooltip
        iconName="filterList"
        tooltip={showFilters ? t('common.hideFilters') : t('common.showFilters')}
        onClick={onToggleFilters}
        color={hasActiveFilters ? 'primary' : 'default'}
      />
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
};

FilterActions.displayName = 'FilterActions';

export default FilterActions;
