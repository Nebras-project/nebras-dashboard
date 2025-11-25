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
import { borderRadius } from '@theme';
import { NAV_ITEM_DIMENSIONS } from '@constants';

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => !['customVariant', 'customColor', 'collapsed'].includes(prop),
})(({ theme, customVariant, customColor, selected, collapsed }) => {
  const getVariantStyles = (variant) => {
    const variantConfig =
      NAV_ITEM_DIMENSIONS.variants[variant] || NAV_ITEM_DIMENSIONS.variants.default;

    return {
      height: `${variantConfig.height}px`,
      minHeight: `${variantConfig.height}px`,
      padding: `0 ${variantConfig.paddingX}px`,
    };
  };

  const getColorStyles = (color) => {
    if (selected) {
      const colorMap = {
        primary: {
          backgroundColor:
            theme.palette.mode === 'dark' ? 'background.paper' : 'background.primary',
          color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main',
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'dark' ? 'background.surface.level2' : 'primary.light',
            color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.dark',
          },
          '& .MuiListItemIcon-root': {
            color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main',
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
    transition: NAV_ITEM_DIMENSIONS.transition,
    justifyContent: collapsed ? 'center' : 'flex-start',
    ...variantStyles,
    ...colorStyles,
  };
});

const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})(({ collapsed }) => ({
  minWidth: collapsed ? 'auto' : `${NAV_ITEM_DIMENSIONS.icon.minWidth}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: NAV_ITEM_DIMENSIONS.transition,
  fontSize: NAV_ITEM_DIMENSIONS.icon.fontSize,
  '& svg': {
    fontSize: NAV_ITEM_DIMENSIONS.icon.fontSize,
    display: 'block',
  },
}));

const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'customVariant',
})(({ customVariant }) => ({
  '& .MuiListItemText-primary': {
    fontSize: customVariant === 'dense' ? '0.75rem' : '0.875rem',
  },
}));

const ListButton = forwardRef(
  (
    {
      onClick,
      icon,
      text,
      endContent = null,
      selected = false,
      disabled = false,
      loading = false,
      collapsed = false,
      showTooltip = null,
      tooltipPlacement = 'right',
      variant = 'default',
      color = 'primary',
      sx = {},
      iconSx = {},
      textProps = {},
      ...rest
    },
    ref
  ) => {
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
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...rest}
      >
        <StyledListItemIcon collapsed={collapsed} sx={iconSx} aria-hidden="true">
          {loading ? (
            <CircularProgress
              size={NAV_ITEM_DIMENSIONS.loaderSize}
              color="inherit"
              aria-hidden="true"
            />
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

    const shouldShowTooltip = showTooltip !== null ? showTooltip : collapsed && text && !loading;

    if (shouldShowTooltip && text) {
      return (
        <Tooltip title={text} placement={tooltipPlacement} arrow>
          {button}
        </Tooltip>
      );
    }

    return button;
  }
);

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
