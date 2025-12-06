// external imports
import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

// internal imports
import { useFormContext as useReactHookFormContext } from 'react-hook-form';

/**
 * Form.ResetButton Component
 *
 * Single Responsibility: Reset button for form that resets to default values
 */
const FormResetButton = memo(function FormResetButton({
  children = 'Reset',
  variant = 'text',
  color = 'primary',
  onClick,
  ...buttonProps
}) {
  const { reset } = useReactHookFormContext();

  const handleReset = useCallback(
    (event) => {
      reset();
      onClick?.(event);
    },
    [reset, onClick]
  );

  return (
    <Button type="button" variant={variant} color={color} onClick={handleReset} {...buttonProps}>
      {children}
    </Button>
  );
});

FormResetButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
  onClick: PropTypes.func,
};

FormResetButton.displayName = 'Form.ResetButton';

export default FormResetButton;
