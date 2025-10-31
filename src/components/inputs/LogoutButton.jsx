// external imports
import { MdLogout } from 'react-icons/md';
import PropTypes from 'prop-types';

// internal imports
import { Button } from '@components';
import { useTranslation, useUser, useLanguage } from '@hooks';

/**
 * LogoutButton Component
 * A reusable logout button component
 *
 * @param {string} variant - Button variant: 'contained', 'outlined', 'text'
 * @param {string} size - Button size: 'small', 'medium', 'large'
 * @param {string} color - Button color: 'primary', 'secondary', 'error', etc.
 * @param {boolean} fullWidth - Whether button should take full width
 * @param {function} onLogout - Optional callback fired after logout
 * @param {object} sx - Additional sx styles
 * @param {boolean} showIcon - Whether to show logout icon
 * @param {boolean} disableHover - Whether to disable hover effects (default: true)
 * @param {object} ...rest - Other props passed to Button
 */
function LogoutButton({
  variant = 'text',
  size = 'medium',
  color = 'error',
  fullWidth = false,
  onLogout,
  sx = {},
  showIcon = true,
  disableHover = true,
  ...rest
}) {
  const { t } = useTranslation();
  const { logout } = useUser();
  const { isRTL } = useLanguage();

  const handleLogout = () => {
    logout();
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      fullWidth={fullWidth}
      onClick={handleLogout}
      endIcon={
        showIcon ? <MdLogout style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} /> : undefined
      }
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        ...(disableHover && {
          '&:hover': {
            transform: 'none !important',
            boxShadow: 'none !important',
            backgroundColor: 'transparent !important',
          },
          '&:active': {
            transform: 'none !important',
          },
        }),
        ...sx,
      }}
      {...rest}
    >
      {t('common.logout')}
    </Button>
  );
}

LogoutButton.propTypes = {
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
    'inherit',
  ]),
  fullWidth: PropTypes.bool,
  onLogout: PropTypes.func,
  sx: PropTypes.object,
  showIcon: PropTypes.bool,
  disableHover: PropTypes.bool,
};

export default LogoutButton;
