// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Checkbox, FormHelperText, FormControl } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// internal imports
import { useFormFieldError } from '../hooks';
import { FORM_DEFAULTS } from '../constants';

/**
 * CheckboxInput Component
 *
 * Single Responsibility: Checkbox field integrated with React Hook Form
 */

const CheckboxInput = memo(function CheckboxInput({
  name,
  label,
  rules,
  defaultValue = FORM_DEFAULTS.CHECKBOX_DEFAULT_VALUE,
  ...checkboxProps
}) {
  const { control } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl error={hasError}>
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} {...checkboxProps} />}
            label={label}
          />
          {hasError && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
});

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.bool,
};

CheckboxInput.displayName = 'CheckboxInput';

export default CheckboxInput;
