// external imports
import { InputAdornment, IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon } from '@components';
import { useTranslation } from '@hooks';

/**
 * PasswordVisibilityToggle Component
 * Single Responsibility: Toggle password visibility with tooltip
 */
function PasswordVisibilityToggle({ showPassword, onToggle }) {
  const { t } = useTranslation();

  const tooltipTitle = showPassword ? t('auth.hidePassword') : t('auth.showPassword');
  const iconName = showPassword ? 'eye' : 'eyeClosed';

  return (
    <InputAdornment position="end">
      <Tooltip title={tooltipTitle} arrow placement="top">
        <IconButton onClick={onToggle} edge="end" aria-label={tooltipTitle} size="small">
          <Icon name={iconName} size={20} />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
}

PasswordVisibilityToggle.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default PasswordVisibilityToggle;
