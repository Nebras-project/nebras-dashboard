// external imports
import { memo, useCallback, useMemo, useId } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { Icon, Button } from '@components';
import { margin, gap, padding } from '@constants';

/**
 * ConfirmDialog Component
 *
 * Single Responsibility: Display a confirmation dialog with title, message, and action buttons
 */

// Constants
const DEFAULT_MIN_WIDTH = 400;
const ICON_SIZE = 48;

// Icon mapping based on confirm color
const ICON_MAP = {
  error: 'error',
  warning: 'infoOutline',
  info: 'info',
  success: 'checkCircle',
};

// Styles
const getIconStyles = () => ({
  fontSize: ICON_SIZE,
  ...margin.bottom.sm,
});

const getTitleBoxStyles = () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  ...gap.sm,
});

const getIconBoxStyles = (iconColor, confirmColor) => ({
  color: iconColor || `${confirmColor}.main`,
});

const getContentStyles = () => ({
  textAlign: 'center',
  ...padding.top.md,
});

const getActionsStyles = () => ({
  justifyContent: 'center',
  ...padding.x.md,
  ...padding.top.sm,
  ...gap.sm,
});

const getPaperStyles = (minWidth) => ({
  minWidth,
  backgroundImage: 'none ',
  ...padding.all.sm,
  boxShadow: 'none'
});

// Sub-components
const DialogIcon = memo(function DialogIcon({ icon, iconColor, confirmColor }) {
  if (!icon) return null;

  const iconName = typeof icon === 'string' ? icon : undefined;
  const iconComponent = typeof icon !== 'string' ? icon : undefined;

  return (
    <Box sx={getIconBoxStyles(iconColor, confirmColor)}>
      <Icon name={iconName} size={ICON_SIZE} component={iconComponent} style={getIconStyles()} />
    </Box>
  );
});

DialogIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  iconColor: PropTypes.string,
  confirmColor: PropTypes.string,
};

const DialogTitleContent = memo(function DialogTitleContent({
  icon,
  iconColor,
  confirmColor,
  title,
}) {
  return (
    <Box sx={getTitleBoxStyles()}>
      <DialogIcon icon={icon} iconColor={iconColor} confirmColor={confirmColor} />
      {title && <Box component="span">{title}</Box>}
    </Box>
  );
});

DialogTitleContent.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  iconColor: PropTypes.string,
  confirmColor: PropTypes.string,
  title: PropTypes.string,
};

const DialogButtons = memo(function DialogButtons({
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
  confirmColor,
  t,
}) {
  return (
    <>
      <Button onClick={onCancel} color="inherit" variant="contained" size="medium">
        {cancelText || t('common.cancel')}
      </Button>
      <Button onClick={onConfirm} color={confirmColor} variant="contained" autoFocus size="medium">
        {confirmText || t('common.confirm')}
      </Button>
    </>
  );
});

DialogButtons.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  confirmColor: PropTypes.string,
  t: PropTypes.func.isRequired,
};

// Main Component
const ConfirmDialog = memo(function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  confirmColor = 'primary',
  minWidth = DEFAULT_MIN_WIDTH,
  icon,
  iconColor,
  ...dialogProps
}) {
  const { t } = useTranslation();

  const handleConfirm = useCallback(() => {
    onConfirm?.();
    onClose();
  }, [onConfirm, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  // Auto-select icon based on confirmColor if not provided
  const displayIcon = useMemo(() => {
    if (icon) return icon;
    return ICON_MAP[confirmColor] || ICON_MAP.primary;
  }, [icon, confirmColor]);

  const uniqueId = useId();
  const dialogTitleId = `confirm-dialog-title-${uniqueId}`;
  const dialogDescriptionId = `confirm-dialog-description-${uniqueId}`;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="mobile"
      role="dialog"
      aria-labelledby={title ? dialogTitleId : undefined}
      aria-describedby={message ? dialogDescriptionId : undefined}
      aria-modal="true"
      slotProps={{
        paper: {
          sx: getPaperStyles(minWidth),
        },
      }}
      {...dialogProps}
    >
      <DialogTitle id={dialogTitleId}>
        <DialogTitleContent
          icon={displayIcon}
          iconColor={iconColor}
          confirmColor={confirmColor}
          title={title}
        />
      </DialogTitle>
      <DialogContent sx={getContentStyles()}>
        {message && <DialogContentText id={dialogDescriptionId}>{message}</DialogContentText>}
      </DialogContent>
      <DialogActions sx={getActionsStyles()}>
        <DialogButtons
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          cancelText={cancelText}
          confirmText={confirmText}
          confirmColor={confirmColor}
          t={t}
        />
      </DialogActions>
    </Dialog>
  );
});

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  minWidth: PropTypes.number,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmColor: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success']),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  iconColor: PropTypes.string,
};

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
