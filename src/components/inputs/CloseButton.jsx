// external imports
import { memo, forwardRef } from 'react';
import { IconButton, Button, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon } from '@components';
import { useTranslation } from '@hooks';
import { borderRadius } from '@theme';
import { padding, SPACING_VALUES } from '@constants/spacing';

// Default configuration
const CLOSE_BUTTON_DEFAULTS = {
  variant: 'icon', // 'icon' or 'text'
  size: 'medium',
  position: 'relative',
  iconName: 'close',
  showTooltip: true,
  tooltipPlacement: 'top',
};

// Size configurations
const CLOSE_BUTTON_SIZES = {
  small: {
    buttonSize: 'small',
    iconSize: 16,
    padding: padding.all.xxs,
  },
  medium: {
    buttonSize: 'medium',
    iconSize: 20,
    padding: padding.all.xs,
  },
  large: {
    buttonSize: 'large',
    iconSize: 24,
    padding: padding.all.sm,
  },
};

// Default button styles
const CLOSE_BUTTON_STYLES = {
  color: 'text.secondary',
  '&:hover': {
    color: 'text.primary',
    backgroundColor: 'action.hover',
  },
};

// Position styles (using spacing values converted to pixels: multiplier * 8px)
const getSpacingPx = (multiplier) => `${multiplier * 8}px`;

const CLOSE_BUTTON_POSITIONS = {
  relative: {},
  absolute: {
    position: 'absolute',
  },
  'top-right': {
    position: 'absolute',
    top: getSpacingPx(SPACING_VALUES.md),
    right: getSpacingPx(SPACING_VALUES.md),
  },
  'top-left': {
    position: 'absolute',
    top: getSpacingPx(SPACING_VALUES.sm),
    left: getSpacingPx(SPACING_VALUES.sm),
  },
  'bottom-right': {
    position: 'absolute',
    bottom: getSpacingPx(SPACING_VALUES.sm),
    right: getSpacingPx(SPACING_VALUES.sm),
  },
  'bottom-left': {
    position: 'absolute',
    bottom: getSpacingPx(SPACING_VALUES.sm),
    left: getSpacingPx(SPACING_VALUES.sm),
  },
};

/**
 * CloseButton Component
 *
 * A globally reusable close button component with consistent styling,
 * accessibility features, and theme integration.
 *
 * @component
 */
const CloseButton = memo(
  forwardRef(function CloseButton(
    {
      onClick,
      variant = CLOSE_BUTTON_DEFAULTS.variant,
      size = CLOSE_BUTTON_DEFAULTS.size,
      position = CLOSE_BUTTON_DEFAULTS.position,
      disabled = false,
      showTooltip = CLOSE_BUTTON_DEFAULTS.showTooltip,
      tooltipTitle,
      tooltipPlacement = CLOSE_BUTTON_DEFAULTS.tooltipPlacement,
      iconName = CLOSE_BUTTON_DEFAULTS.iconName,
      iconSize,
      text,
      children,
      sx = {},
      ...props
    },
    ref
  ) {
    const { t } = useTranslation();

    const config = CLOSE_BUTTON_SIZES[size];
    const finalIconSize = iconSize || config.iconSize;
    const defaultTooltipTitle = tooltipTitle || t('common.close', 'Close');

    // Button styles
    const sizeConfig = CLOSE_BUTTON_SIZES[size];
    const positionStyles = CLOSE_BUTTON_POSITIONS[position];

    const buttonStyles = {
      borderRadius: borderRadius.sm,
      transition: 'all 0.2s ease-in-out',
      ...sizeConfig.padding,
      ...CLOSE_BUTTON_STYLES,
      ...positionStyles,
      ...sx,
    };

    // Determine button content
    const displayText = text || children || t('common.close', 'Close');
    const showIcon = variant === 'icon' || (variant === 'text' && iconName);

    // Render appropriate button type
    const button =
      variant === 'icon' ? (
        <IconButton
          ref={ref}
          size={config.buttonSize}
          onClick={onClick}
          disabled={disabled}
          sx={buttonStyles}
          aria-label={defaultTooltipTitle}
          {...props}
        >
          <Icon name={iconName} size={finalIconSize} />
        </IconButton>
      ) : (
        <Button
          ref={ref}
          size={config.buttonSize}
          onClick={onClick}
          disabled={disabled}
          sx={buttonStyles}
          aria-label={defaultTooltipTitle}
          startIcon={showIcon && <Icon name={iconName} size={finalIconSize} />}
          {...props}
        >
          {displayText || defaultTooltipTitle}
        </Button>
      );

    // Wrap with tooltip if requested
    if (showTooltip && !disabled) {
      return (
        <Tooltip title={defaultTooltipTitle} placement={tooltipPlacement}>
          {button}
        </Tooltip>
      );
    }

    return button;
  })
);

CloseButton.propTypes = {
  /**
   * Function to call when button is clicked
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Button variant - 'icon' shows only icon, 'text' shows text with optional icon
   * @default 'icon'
   */
  variant: PropTypes.oneOf(['icon', 'text']),

  /**
   * Size of the button
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

  /**
   * Position style for the button
   * @default 'relative'
   */
  position: PropTypes.oneOf([
    'relative',
    'absolute',
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
  ]),

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * Whether to show tooltip on hover
   * @default true
   */
  showTooltip: PropTypes.bool,

  /**
   * Custom tooltip title (defaults to translated 'Close')
   */
  tooltipTitle: PropTypes.string,

  /**
   * Tooltip placement
   * @default 'top'
   */
  tooltipPlacement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),

  /**
   * Custom icon name (defaults to 'close')
   * @default 'close'
   */
  iconName: PropTypes.string,

  /**
   * Custom icon size (overrides size-based default)
   */
  iconSize: PropTypes.number,

  /**
   * Text content for text variant (overrides children)
   */
  text: PropTypes.string,

  /**
   * Text content as children (for text variant)
   */
  children: PropTypes.node,

  /**
   * Additional styles
   */
  sx: PropTypes.object,
};

CloseButton.displayName = 'CloseButton';

export default CloseButton;
