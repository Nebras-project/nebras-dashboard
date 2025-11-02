// external imports
import { Button as MuiButton, CircularProgress, styled } from '@mui/material';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { borderRadius, fontWeights } from '@theme';

// Styled Button component
const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => !['loading', 'customVariant', 'customSize', 'customColor'].includes(prop),
})(({ customVariant, customSize }) => {
  // Get size-specific styles
  const getSizeStyles = (size) => {
    const sizeMap = {
      small: {
        padding: '6px 12px',
        fontSize: '0.75rem',
        minHeight: '32px',
      },
      medium: {
        padding: '8px 16px',
        fontSize: '0.875rem',
        minHeight: '40px',
      },
      large: {
        padding: '12px 24px',
        fontSize: '1rem',
        minHeight: '48px',
      },
    };
    return sizeMap[size] || sizeMap.medium;
  };

  // Get variant-specific styles
  const getVariantStyles = (variant) => {
    const baseStyles = {
      borderRadius: borderRadius.md,
      textTransform: 'none',
      fontWeight: fontWeights.semiBold,
      boxShadow: 'none',
      transition: 'all 0.2s ease-in-out',
    };

    const variantStyles = {
      contained: {
        ...baseStyles,
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      },
      outlined: {
        ...baseStyles,
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px',
          transform: 'translateY(-1px)',
        },
      },
      text: {
        ...baseStyles,
        '&:hover': {
          backgroundColor: 'action.hover',
          transform: 'translateY(-1px)',
        },
      },
    };

    return variantStyles[variant] || variantStyles.contained;
  };

  const sizeStyles = getSizeStyles(customSize);
  const variantStyles = getVariantStyles(customVariant);

  return {
    ...sizeStyles,
    ...variantStyles,
  };
});

const Button = forwardRef(({
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  children,
  sx = {},
  onClick,
  type = 'button',
  ...rest
}, ref) => {
  const isDisabled = disabled || loading;

  return (
    <StyledButton
      ref={ref}
      variant={variant}
      size={size}
      color={color}
      disabled={isDisabled}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      endIcon={!loading ? endIcon : undefined}
      onClick={onClick}
      type={type}
      customVariant={variant}
      customSize={size}
      customColor={color}
      sx={sx}
      {...rest}
    >
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;


