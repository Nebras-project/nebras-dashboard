// external imports
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

// internal imports
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { padding } from '@constants';
import { fontWeights } from '@theme/typography';
import { borderRadius } from '@theme/components';

const getButtonStyles = () => ({
  ...padding.y.md,
  fontSize: '1rem',
  fontWeight: fontWeights.semiBold,
  borderRadius: borderRadius.xxs,
  textTransform: 'uppercase',
});

/**
 * Form.SubmitButton Component
 *
 * Single Responsibility: Submit button for form with loading state
 */
const FormSubmitButton = memo(function FormSubmitButton({
  children = 'Submit',
  variant = 'contained',
  color = 'primary',
  loading,
  disabled,
  startIcon,
  endIcon,
  sx,
  ...buttonProps
}) {
  const {
    formState: { isSubmitting },
  } = useReactHookFormContext();

  const isLoading = loading !== undefined ? loading : isSubmitting;
  const isDisabled = disabled !== undefined ? disabled : isLoading;

  // Memoized merged styles
  const mergedStyles = useMemo(
    () => ({
      ...getButtonStyles(),
      ...sx,
    }),
    [sx]
  );

  return (
    <Button
      type="submit"
      variant={variant}
      color={color}
      loading={isLoading}
      disabled={isDisabled}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={mergedStyles}
      {...buttonProps}
    >
      {children}
    </Button>
  );
});

FormSubmitButton.propTypes = {
  children: PropTypes.node, 
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  sx: PropTypes.object,
};

FormSubmitButton.displayName = 'Form.SubmitButton';

export default FormSubmitButton;
