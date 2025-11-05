// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// internal imports
import { useFormFieldError } from '../hooks';

/**
 * TextInput Component
 *
 * Single Responsibility: Text input field integrated with React Hook Form
 */

// internal imports
import { FORM_DEFAULTS } from '../constants';

const TextInput = memo(function TextInput({
  name,
  label,
  rules,
  defaultValue = FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
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
          label={label}
          error={hasError}
          helperText={helperText}
          fullWidth={textFieldProps.fullWidth !== false}
          margin={textFieldProps.margin || 'normal'}
        />
      )}
    />
  );
});

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
};

TextInput.displayName = 'TextInput';

export default TextInput;
