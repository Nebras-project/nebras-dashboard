// external imports
import PropTypes from 'prop-types';

// internal imports
import { Button, Icon, ConfirmDialog } from '@components';
import { useTranslation, useLanguage, useConfirmDialog } from '@hooks';
import { useLogout } from '@features/authentication';

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
    },
    '&:active': {
      transform: 'none !important',
    },
    '&:focus': {
      backgroundColor: 'transparent !important',
    },
  }),
  ...sx,
});

const getLogoutIcon = (showIcon, isRTL) => {
  if (!showIcon) return undefined;
  return <Icon name="logout" size={18} style={getIconStyles(isRTL)} />;
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
  const { isRTL } = useLanguage();
  const { open, show, close } = useConfirmDialog();
  const { logout, isPending } = useLogout({
    onSuccess: () => {
      // Call custom onLogout callback if provided
      if (onLogout && typeof onLogout === 'function') {
        onLogout();
      }
    },
  });

  const handleLogoutClick = () => {
    show();
  };

  const handleConfirmLogout = () => {
    close();
    logout();
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        color={color}
        fullWidth={fullWidth}
        onClick={handleLogoutClick}
        endIcon={getLogoutIcon(showIcon, isRTL)}
        sx={getButtonStyles(fullWidth, width, disableHover, sx)}
        aria-label={t('common.logout')}
        disabled={isPending}
        {...rest}
      >
        {t('common.logout')}
      </Button>

      <ConfirmDialog
        open={open}
        onClose={close}
        onConfirm={handleConfirmLogout}
        title={t('auth.logoutConfirm')}
        message={t('auth.logoutConfirmMessage')}
        confirmText={t('common.logout')}
        cancelText={t('common.cancel')}
        confirmColor="error"
        loading={isPending}
      />
    </>
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
