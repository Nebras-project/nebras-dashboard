// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// internal imports
import { useFormFieldError } from '../hooks';
import { parseOption } from '../utils';
import { FORM_DEFAULTS } from '../constants';

/**
 * RadioInput Component
 *
 * Single Responsibility: Radio button group field integrated with React Hook Form
 */

const RadioInput = memo(function RadioInput({
  name,
  label,
  options = [],
  rules,
  defaultValue = FORM_DEFAULTS.RADIO_DEFAULT_VALUE,
  row = false,
  ...radioGroupProps
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
        <FormControl error={hasError} component="fieldset">
          {label && <FormLabel component="legend">{label}</FormLabel>}
          <RadioGroup {...field} row={row} {...radioGroupProps}>
            {options.map((option) => {
              const { value, label: optionLabel } = parseOption(option);

              return (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={optionLabel}
                />
              );
            })}
          </RadioGroup>
          {hasError && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
});

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  rules: PropTypes.object,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  row: PropTypes.bool,
};

RadioInput.displayName = 'RadioInput';

export default RadioInput;
