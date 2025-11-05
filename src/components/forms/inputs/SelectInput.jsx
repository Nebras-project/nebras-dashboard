// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// internal imports
import { useFormFieldError } from '../hooks';
import { parseOption } from '../utils';
import { FORM_DEFAULTS, FORM_MARGINS } from '../constants';

/**
 * SelectInput Component
 *
 * Single Responsibility: Select dropdown field integrated with React Hook Form
 */

const SelectInput = memo(function SelectInput({
  name,
  label,
  options = [],
  rules,
  defaultValue = FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
  fullWidth = true,
  margin = FORM_MARGINS.NORMAL,
  ...selectProps
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
        <FormControl fullWidth={fullWidth} margin={margin} error={hasError}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            {...selectProps}
            labelId={`${name}-label`}
            label={label}
            error={hasError}
          >
            {options.map((option) => {
              const { value, label: optionLabel } = parseOption(option);

              return (
                <MenuItem key={value} value={value}>
                  {optionLabel}
                </MenuItem>
              );
            })}
          </Select>
          {hasError && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
});

SelectInput.propTypes = {
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
  ),
  rules: PropTypes.object,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
};

SelectInput.displayName = 'SelectInput';

export default SelectInput;
