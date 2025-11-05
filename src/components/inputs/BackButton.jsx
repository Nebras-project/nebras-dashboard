// external imports
import { memo, forwardRef } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// internal imports
import { Icon, Button } from '@components';
import { useTranslation, useLanguage } from '@hooks';
import { borderRadius } from '@theme';
import { padding } from '@constants';

// Default configuration
const BACK_BUTTON_DEFAULTS = {
  variant: 'icon-text', // 'icon', 'text', or 'icon-text'
  size: 'medium',
  iconName: 'arrowBack',
  showTooltip: true,
  tooltipPlacement: 'top',
};

// Size configurations
const BACK_BUTTON_SIZES = {
  small: {
    buttonSize: 'small',
    iconSize: 16,
    ...padding.y.xxs,
    ...padding.x.xs,
  },
  medium: {
    buttonSize: 'medium',
    iconSize: 20,
    ...padding.y.xs,
    ...padding.x.sm,
  },
  large: {
    buttonSize: 'large',
    iconSize: 24,
    ...padding.y.sm,
    ...padding.x.md,
  },
};

// Default button styles
const BACK_BUTTON_STYLES = {
  color: 'text.secondary',
  '&:hover': {
    color: 'text.primary',
    backgroundColor: 'action.hover',
  },
};

/**
 * BackButton Component
 *
 * A reusable back button component that supports different display variants:
 * - 'icon': Shows only the back arrow icon
 * - 'text': Shows only the text "Back"
 * - 'icon-text': Shows icon with text (e.g., "← Back")
 *
 * @component
 */
const BackButton = memo(
  forwardRef(function BackButton(
    {
      onClick,
      to,
      variant = BACK_BUTTON_DEFAULTS.variant,
      size = BACK_BUTTON_DEFAULTS.size,
      disabled = false,
      showTooltip = BACK_BUTTON_DEFAULTS.showTooltip,
      tooltipTitle,
      tooltipPlacement = BACK_BUTTON_DEFAULTS.tooltipPlacement,
      iconName = BACK_BUTTON_DEFAULTS.iconName,
      iconSize,
      text,
      children,
      sx = {},
      ...props
    },
    ref
  ) {
    const { t } = useTranslation();
    const { isRTL } = useLanguage();
    const navigate = useNavigate();

    const config = BACK_BUTTON_SIZES[size];
    const finalIconSize = iconSize || config.iconSize;
    const defaultText = text || children || t('common.back', 'Back');
    const defaultTooltipTitle = tooltipTitle || t('common.back', 'Back');

    // Icon styles with RTL support - flip icon horizontally in RTL
    const iconStyles = isRTL ? { transform: 'scaleX(-1)' } : {};

    const handleClick = (e) => {
      if (onClick) {
        onClick(e);
      } else if (to) {
        navigate(to);
      } else {
        navigate(-1); // Go back in history
      }
    };

    // Button styles
    const buttonStyles = {
      borderRadius: borderRadius.xxs,
      transition: 'all 0.2s ease-in-out',
      ...config.padding,
      ...BACK_BUTTON_STYLES,
      ...sx,
    };

    // Determine what to render based on variant
    let button;

    if (variant === 'icon') {
      // Icon only variant
      button = (
        <IconButton
          ref={ref}
          size={config.buttonSize}
          onClick={handleClick}
          disabled={disabled}
          sx={buttonStyles}
          aria-label={defaultTooltipTitle}
          {...props}
        >
          <Icon name={iconName} size={finalIconSize} style={iconStyles} />
        </IconButton>
      );
    } else if (variant === 'text') {
      // Text only variant
      button = (
        <Button
          ref={ref}
          size={config.buttonSize}
          onClick={handleClick}
          disabled={disabled}
          sx={buttonStyles}
          aria-label={defaultTooltipTitle}
          variant="outlined"
          {...props}
        >
          {defaultText}
        </Button>
      );
    } else {
      // icon-text variant (default) - shows icon with text
      button = (
        <Button
          ref={ref}
          size={config.buttonSize}
          onClick={handleClick}
          disabled={disabled}
          sx={buttonStyles}
          aria-label={defaultTooltipTitle}
          startIcon={<Icon name={iconName} size={finalIconSize} style={iconStyles} />}
          variant="outlined"
          {...props}
        >
          {defaultText}
        </Button>
      );
    }

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

BackButton.propTypes = {
  /**
   * Custom onClick handler (overrides default navigation)
   */
  onClick: PropTypes.func,

  /**
   * Path to navigate to (overrides default back navigation)
   */
  to: PropTypes.string,

  /**
   * Button variant - 'icon' shows only icon, 'text' shows only text, 'icon-text' shows icon with text
   * @default 'icon-text'
   */
  variant: PropTypes.oneOf(['icon', 'text', 'icon-text']),

  /**
   * Size of the button
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

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
   * Custom tooltip title (defaults to translated 'Back')
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
   * Custom icon name (defaults to 'arrowBack')
   * @default 'arrowBack'
   */
  iconName: PropTypes.string,

  /**
   * Custom icon size (overrides size-based default)
   */
  iconSize: PropTypes.number,

  /**
   * Text content (overrides children and default translation)
   */
  text: PropTypes.string,

  /**
   * Text content as children (for text and icon-text variants)
   */
  children: PropTypes.node,

  /**
   * Additional styles
   */
  sx: PropTypes.object,
};

BackButton.displayName = 'BackButton';

export default BackButton;
