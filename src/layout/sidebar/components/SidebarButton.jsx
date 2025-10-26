// external imports
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import {
  getSidebarControlButtonStyles,
  getSidebarControlIconStyles,
  getSidebarControlTextProps,
} from '@constants';

/**
 * SidebarButton Component
 * Reusable button component for sidebar navigation and controls
 * Handles collapsed/expanded states and tooltip wrapping automatically
 */
function SidebarButton({
  onClick,
  icon,
  text,
  endContent = null,
  collapsed = false,
  selected = false,
  tooltipPlacement = 'right',
  sx = {},
  iconSx = {},
  textProps = {},
}) {
  const buttonStyles = useMemo(() => getSidebarControlButtonStyles(), []);
  const iconStyles = useMemo(() => getSidebarControlIconStyles(), []);
  const defaultTextProps = useMemo(() => getSidebarControlTextProps(), []);

  const button = (
    <ListItemButton
      onClick={onClick}
      selected={selected}
      sx={{
        ...buttonStyles,
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 0 : 2,
        ...sx,
      }}
    >
      <ListItemIcon
        sx={{
          ...iconStyles,
          minWidth: collapsed ? 'auto' : iconStyles.minWidth,
          ...iconSx,
        }}
      >
        {icon}
      </ListItemIcon>

      {!collapsed && (
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            ...defaultTextProps,
            ...textProps,
          }}
        />
      )}

      {!collapsed && endContent}
    </ListItemButton>
  );

  // Wrap with tooltip when collapsed
  if (collapsed && text) {
    return (
      <Tooltip title={text} placement={tooltipPlacement} arrow>
        {button}
      </Tooltip>
    );
  }

  return button;
}

SidebarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  endContent: PropTypes.node,
  collapsed: PropTypes.bool,
  selected: PropTypes.bool,
  tooltipPlacement: PropTypes.string,
  sx: PropTypes.object,
  iconSx: PropTypes.object,
  textProps: PropTypes.object,
};


export default SidebarButton;

