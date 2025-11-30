// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';

// internal imports
import { Icon } from '@components';

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
  color = 'default',
  size = 24,
  disabled = false,
  placement = 'top',
  arrow = true,
  minWidth,
  ...iconButtonProps
}) {
  const button = (
    <IconButton
      onClick={onClick}
      color={color}
      disabled={disabled}
      sx={{ minWidth, ...iconButtonProps.sx }}
      {...iconButtonProps}
    >
      <Icon name={iconName} size={size} />
    </IconButton>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement={placement} arrow={arrow}>
        {button}
      </Tooltip>
    );
  }

  return button;
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
};

IconButtonWithTooltip.displayName = 'IconButtonWithTooltip';

export default IconButtonWithTooltip;
