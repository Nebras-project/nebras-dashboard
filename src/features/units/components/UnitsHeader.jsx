// external imports
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon, ActionsMenu } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';
import { getActionsButtonStyles } from '@constants/layout';

/**
 * UnitsHeader Component
 *
 * Single Responsibility: Display units section header with title, subtitle, and add action
 */
function UnitsHeader({ title, onUnitAdd }) {
  const { t } = useTranslation();
  const { isLight } = useReduxTheme();

  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        {title && (
          <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
            {title}
          </Typography>
        )}
      </Box>

      {onUnitAdd && (
        <ActionsMenu
          actions={[
            {
              label: t('grade.addUnit'),
              icon: <Icon name="add" size={18} />,
              onClick: onUnitAdd,
            },
          ]}
          iconButtonProps={{
            size: 'small',
            sx: getActionsButtonStyles(isLight),
          }}
          checkPermissions={false}
        />
      )}
    </Box>
  );
}

UnitsHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onUnitAdd: PropTypes.func,
};

UnitsHeader.defaultProps = {
  title: null,
  subtitle: null,
  onUnitAdd: null,
};

export default UnitsHeader;
