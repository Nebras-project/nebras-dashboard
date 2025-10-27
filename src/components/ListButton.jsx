// external imports
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  CircularProgress,
  styled,
} from '@mui/material';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { borderRadius, fontWeights } from '@theme';

// Styled ListItemButton component
const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => !['customVariant', 'customColor', 'collapsed'].includes(prop),
})(({ customVariant, customColor, selected, collapsed }) => {
  // Get variant-specific styles
  const getVariantStyles = (variant) => {
    const variantMap = {
      default: {
        height: '48px',
        minHeight: '48px',
        padding: '0 16px',
      },
      dense: {
        height: '40px',
        minHeight: '40px',
        padding: '0 12px',
      },
      comfortable: {
        height: '56px',
        minHeight: '56px',
        padding: '0 20px',
      },
    };
    return variantMap[variant] || variantMap.default;
  };

  // Get color-specific styles
  const getColorStyles = (color, selected) => {
    if (selected) {
      const colorMap = {
        primary: {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'primary.dark',
            color: 'primary.contrastText',
          },
          '& .MuiListItemIcon-root': {
            color: 'primary.contrastText',
          },
        },
        secondary: {
          backgroundColor: 'secondary.main',
          color: 'secondary.contrastText',
          '&:hover': {
            backgroundColor: 'secondary.dark',
          },
          '& .MuiListItemIcon-root': {
            color: 'secondary.contrastText',
          },
        },
        error: {
          backgroundColor: 'error.main',
          color: 'error.contrastText',
          '&:hover': {
            backgroundColor: 'error.dark',
          },
          '& .MuiListItemIcon-root': {
            color: 'error.contrastText',
          },
        },
      };
      return colorMap[color] || colorMap.primary;
    }

    return {
      '&:hover': {
        backgroundColor: 'action.hover',
      },
    };
  };

  const variantStyles = getVariantStyles(customVariant);
  const colorStyles = getColorStyles(customColor, selected);

  return {
    borderRadius: borderRadius.sm,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    transition: 'all 0.2s ease-in-out',
    justifyContent: collapsed ? 'center' : 'flex-start',
    ...variantStyles,
    ...colorStyles,
  };
});

// Styled ListItemIcon component
const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})(({ collapsed }) => ({
  minWidth: collapsed ? 'auto' : '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease-in-out',
  fontSize: '1.25rem',
  '& svg': {
    fontSize: '1.25rem',
    display: 'block',
  },
}));

// Styled ListItemText component
const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'customVariant',
})(({ customVariant }) => ({
  '& .MuiListItemText-primary': {
    fontSize: customVariant === 'dense' ? '0.75rem' : '0.875rem',
    fontWeight: fontWeights.medium,
  },
}));

/**
 * General ListButton Component
 * A reusable list button component for navigation and list-based interactions
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {string} props.text - Text content
 * @param {React.ReactNode} props.endContent - Content to display at the end
 * @param {boolean} props.selected - Whether the button is selected
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} props.loading - Show loading spinner
 * @param {boolean} props.collapsed - Whether the button is in collapsed state
 * @param {boolean} props.showTooltip - Whether to show tooltip (defaults to true when collapsed)
 * @param {string} props.tooltipPlacement - Tooltip placement when collapsed
 * @param {string} props.variant - Button variant ('default', 'dense', 'comfortable')
 * @param {string} props.color - Button color theme
 * @param {Object} props.sx - Additional styles
 * @param {Object} props.iconSx - Additional icon styles
 * @param {Object} props.textProps - Additional text props
 * @param {Object} props.rest - Additional props passed to ListItemButton
 */
const ListButton = forwardRef(({
  onClick,
  icon,
  text,
  endContent = null,
  selected = false,
  disabled = false,
  loading = false,
  collapsed = false,
  showTooltip = null, // null means auto-detect based on collapsed state
  tooltipPlacement = 'right',
  variant = 'default',
  color = 'primary',
  sx = {},
  iconSx = {},
  textProps = {},
  ...rest
}, ref) => {
  // Determine if button should be disabled
  const isDisabled = disabled || loading;

  const button = (
    <StyledListItemButton
      ref={ref}
      onClick={onClick}
      selected={selected}
      disabled={isDisabled}
      customVariant={variant}
      customColor={color}
      collapsed={collapsed}
      sx={sx}
      {...rest}
    >
      <StyledListItemIcon 
        collapsed={collapsed}
        sx={iconSx}
      >
        {loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          icon
        )}
      </StyledListItemIcon>

      {!collapsed && text && (
        <StyledListItemText
          primary={text}
          customVariant={variant}
          primaryTypographyProps={textProps}
        />
      )}

      {!collapsed && endContent}
    </StyledListItemButton>
  );

  // Determine if tooltip should be shown
  const shouldShowTooltip = showTooltip !== null ? showTooltip : (collapsed && text && !loading);

  // Wrap with tooltip when needed
  if (shouldShowTooltip && text) {
    return (
      <Tooltip title={text} placement={tooltipPlacement} arrow>
        {button}
      </Tooltip>
    );
  }

  return button;
});

ListButton.displayName = 'ListButton';

ListButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string,
  endContent: PropTypes.node,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  collapsed: PropTypes.bool,
  showTooltip: PropTypes.bool,
  tooltipPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  variant: PropTypes.oneOf(['default', 'dense', 'comfortable']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success']),
  sx: PropTypes.object,
  iconSx: PropTypes.object,
  textProps: PropTypes.object,
};

export default ListButton;
