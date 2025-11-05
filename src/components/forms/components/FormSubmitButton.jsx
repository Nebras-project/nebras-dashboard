// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

// internal imports
import { useFormContext as useReactHookFormContext } from 'react-hook-form';

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
  ...buttonProps
}) {
  const {
    formState: { isSubmitting },
  } = useReactHookFormContext();

  const isLoading = loading !== undefined ? loading : isSubmitting;
  const isDisabled = disabled !== undefined ? disabled : isLoading;

  return (
    <Button type="submit" variant={variant} color={color} disabled={isDisabled} {...buttonProps}>
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
};

FormSubmitButton.displayName = 'Form.SubmitButton';

export default FormSubmitButton;
