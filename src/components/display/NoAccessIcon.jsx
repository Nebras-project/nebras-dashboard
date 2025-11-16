// external imports
import PropTypes from 'prop-types';
import { Tooltip, Box } from '@mui/material';

// internal imports
import { Icon } from '@components';
import { useTranslation } from '@hooks';

/**
 * NoAccessIcon Component
 *
 * Single Responsibility: Display a disabled lock icon with tooltip when user has no access
 */
function NoAccessIcon({ tooltip }) {
  const { t } = useTranslation();

  const tooltipText = tooltip || t('common.noAccess') || 'No access';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        opacity: 0.5,
      }}
    >
      <Tooltip title={tooltipText} arrow placement="top">
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'not-allowed',
          }}
        >
          <Icon name="lock" size={18} color="disabled" />
        </Box>
      </Tooltip>
    </Box>
  );
}

NoAccessIcon.propTypes = {
  tooltip: PropTypes.string,
};

NoAccessIcon.displayName = 'NoAccessIcon';

export default NoAccessIcon;
