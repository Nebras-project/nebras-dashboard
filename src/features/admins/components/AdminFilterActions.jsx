// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { IconButtonWithTooltip } from '@components';
import { useTranslation } from '@hooks';

/**
 * AdminFilterActions Component
 *
 * Single Responsibility: Admin-specific filter actions (clear, and add button)
 */
const AdminFilterActions = memo(function AdminFilterActions({
  hasActiveFilters,
  onClearFilters,
  addButton,
}) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {hasActiveFilters && (
        <IconButtonWithTooltip
          iconName="clear"
          tooltip={t('admins.filter.clearAll')}
          onClick={onClearFilters}
          text={t('common.clear')}
          size={24}
          color="error"
        />
      )}
      {addButton && <>{addButton}</>}
    </Box>
  );
});

AdminFilterActions.propTypes = {
  hasActiveFilters: PropTypes.bool.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  addButton: PropTypes.node, // Optional: Add button to render in the same row
};

AdminFilterActions.displayName = 'AdminFilterActions';

export default AdminFilterActions;
