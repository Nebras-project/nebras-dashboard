// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField, InputAdornment, CircularProgress } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// internal imports
import { useFormFieldError } from '../hooks';
import { parseOption } from '../utils';
import { FORM_DEFAULTS, FORM_MARGINS } from '../constants';
import { NoOptionsMessage } from '@components/feedback';

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
  loading = false,
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
        <TextField
          {...field}
          {...selectProps}
          select
          label={label}
          error={hasError}
          helperText={helperText}
          fullWidth={fullWidth}
          margin={margin}
          slotProps={{
            ...selectProps.slotProps,
            input: {
              ...selectProps.slotProps?.input,
              endAdornment: loading ? (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ) : (
                selectProps.slotProps?.input?.endAdornment
              ),
            },
            select: {
              ...selectProps.slotProps?.select,
              IconComponent: loading ? () => null : selectProps.slotProps?.select?.IconComponent,
            },
          }}
        >
          {options.length === 0 ? (
            <NoOptionsMessage />
          ) : (
            options.map((option) => {
              const { value, label: optionLabel } = parseOption(option);

              return (
                <MenuItem key={value} value={value}>
                  {optionLabel}
                </MenuItem>
              );
            })
          )}
        </TextField>
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
  loading: PropTypes.bool,
};

SelectInput.displayName = 'SelectInput';

export default SelectInput;
