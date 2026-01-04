// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { FilterActions } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';
import { borderColors } from '@theme/colors';
import { borderRadius } from '@theme';
import { padding } from '@constants';

/**
 * MinisterialFormFilterActions Component
 *
 * Single Responsibility: MinisterialForm-specific filter actions (toggle filters, clear, and add button)
 */
const MinisterialFormFilterActions = memo(function MinisterialFormFilterActions({
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  onClearFilters,
  addButton,
  filterButtonWrapper,
}) {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        border: `1px solid ${borderColors[mode]}`,
        borderRadius: borderRadius.xxs,
        ...padding.all.xs,
      }}
    >
      <FilterActions
        showFilters={showFilters}
        onToggleFilters={onToggleFilters}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
        clearAllLabel={t('ministerialForms.filter.clearAll')}
        filterButtonWrapper={filterButtonWrapper}
      />
      {addButton && <>{addButton}</>}
    </Box>
  );
});

MinisterialFormFilterActions.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  onToggleFilters: PropTypes.func.isRequired,
  hasActiveFilters: PropTypes.bool.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  addButton: PropTypes.node,
  filterButtonWrapper: PropTypes.elementType,
};

MinisterialFormFilterActions.displayName = 'MinisterialFormFilterActions';

export default MinisterialFormFilterActions;
