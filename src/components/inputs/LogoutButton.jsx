// external imports
import PropTypes from 'prop-types';

// internal imports
import { Button, Icon } from '@components';
import { useTranslation, useUser, useLanguage } from '@hooks';

const getIconStyles = (isRTL) => ({
  transform: isRTL ? 'scaleX(-1)' : 'none',
});

const getButtonStyles = (fullWidth, width, disableHover, sx) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: fullWidth ? '100%' : `${width}px`,
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
});

const getLogoutIcon = (showIcon, isRTL) => {
  if (!showIcon) return undefined;
  return <Icon name="logout" style={getIconStyles(isRTL)} />;
};

function LogoutButton({
  variant = 'text',
  size = 'medium',
  color = 'error',
  fullWidth = false,
  width = 'auto',
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
      endIcon={getLogoutIcon(showIcon, isRTL)}
      sx={getButtonStyles(fullWidth, width, disableHover, sx)}
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
  width: PropTypes.string,
  onLogout: PropTypes.func,
  sx: PropTypes.object,
  showIcon: PropTypes.bool,
  disableHover: PropTypes.bool,
};

export default LogoutButton;
