// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip, Typography } from '@mui/material';

// internal imports
import { Icon } from '@components';
import { useResponsive } from '@hooks';
import { margin } from '@constants';

/**
 * IconButtonWithTooltip Component
 *
 * Single Responsibility: Reusable icon button with tooltip
 * Uses the centralized Icon component for consistency
 */
const IconButtonWithTooltip = memo(function IconButtonWithTooltip({
  iconName,
  tooltip,
  onClick,
  color,
  size = 20,
  disabled = false,
  placement = 'top',
  arrow = true,
  minWidth,
  text,
  ...iconButtonProps
}) {
  const { isDesktop } = useResponsive();

  const button = (
    <IconButton
      onClick={onClick}
      color={color}
      disabled={disabled}
      disableRipple
      sx={{
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&:active': {
          backgroundColor: 'transparent',
        },
        '&:focus': {
          backgroundColor: 'transparent',
        },
        ...iconButtonProps.sx,
      }}
      {...iconButtonProps}
    >
      <Icon name={iconName} size={size} color={color} />
      {isDesktop && (
        <Typography variant="body2" sx={{ color: color ? color : 'primary.main', ...margin.left.xs }}>
          {text}
        </Typography>
      )}
    </IconButton>
  );

  const wrappedButton = tooltip ? (
    <Tooltip title={tooltip} placement={placement} arrow={arrow}>
      {button}
    </Tooltip>
  ) : (
    button
  );

  return wrappedButton;
});

IconButtonWithTooltip.propTypes = {
  iconName: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
  ]),
  size: PropTypes.number,
  disabled: PropTypes.bool,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  arrow: PropTypes.bool,
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string, // Optional: Text to display beside the icon button
};

IconButtonWithTooltip.displayName = 'IconButtonWithTooltip';

export default IconButtonWithTooltip;
