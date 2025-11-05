// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// internal imports
import { useFormFieldError } from '../hooks';
import { FORM_DEFAULTS, FORM_INPUT_TYPES } from '../constants';

/**
 * DateInput Component
 *
 * Single Responsibility: Date input field integrated with React Hook Form
 */

const DateInput = memo(function DateInput({
  name,
  label,
  rules,
  defaultValue = FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
  type = FORM_INPUT_TYPES.DATE,
  ...textFieldProps
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
        <TextField
          {...field}
          {...textFieldProps}
          type={type}
          label={label}
          error={hasError}
          helperText={helperText}
          fullWidth={textFieldProps.fullWidth !== false}
          margin={textFieldProps.margin || 'normal'}
          InputLabelProps={{
            shrink: true,
            ...textFieldProps.InputLabelProps,
          }}
        />
      )}
    />
  );
});

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  type: PropTypes.oneOf(['date', 'time', 'datetime-local']),
};

DateInput.displayName = 'DateInput';

export default DateInput;
