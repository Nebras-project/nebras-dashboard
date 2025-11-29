// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, IconButton, InputAdornment, Box, Divider } from '@mui/material';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

// internal imports
import { useFormFieldError } from '../hooks';
import { FORM_DEFAULTS } from '../constants';

/**
 * NumberInput Component
 *
 * Single Responsibility: Number input field integrated with React Hook Form
 * Accepts only natural numbers (positive integers, excludes 0)
 * Includes custom increment/decrement buttons with vertical divider
 */

// Validation helper: checks if value is a valid natural number
const isValidNaturalNumber = (value) => {
  if (value === '') return true;
  const naturalNumberRegex = /^[1-9]\d*$/;
  return naturalNumberRegex.test(value);
};

// Length validation helper
const isWithinMaxLength = (value, maxLength) => {
  if (!maxLength) return true;
  return value.length <= maxLength;
};

// Increment/Decrement button component
const NumberInputButtons = memo(function NumberInputButtons({ onIncrement, onDecrement }) {
  return (
    <InputAdornment position="end">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Divider orientation="vertical" flexItem sx={{ marginX: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <IconButton size="small" onClick={onIncrement} sx={{ width: '20px', padding: 0 }}>
            <MdKeyboardArrowUp size={18} />
          </IconButton>
          <IconButton size="small" onClick={onDecrement} sx={{ width: '20px', padding: 0 }}>
            <MdKeyboardArrowDown size={18} />
          </IconButton>
        </Box>
      </Box>
    </InputAdornment>
  );
});

NumberInputButtons.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

// Styles for hiding default number input arrows
const numberInputStyles = {
  '& input[type=number]': {
    '-moz-appearance': 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
};

const NumberInput = memo(function NumberInput({
  name,
  label,
  rules,
  defaultValue = FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
  maxLength = 3,
  fullWidth = true,
}) {
  const { control } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        const handleChange = (event) => {
          const value = event.target.value;

          if (value === '') {
            field.onChange(value);
            return;
          }

          if (!isWithinMaxLength(value, maxLength)) {
            return;
          }

          if (isValidNaturalNumber(value)) {
            field.onChange(value);
          }
        };

        const handleIncrement = () => {
          const currentValue = parseInt(field.value || '0', 10);
          const newValue = currentValue + 1;
          if (isWithinMaxLength(newValue.toString(), maxLength)) {
            field.onChange(newValue.toString());
          }
        };

        const handleDecrement = () => {
          const currentValue = parseInt(field.value || '0', 10);
          if (currentValue > 1) {
            const newValue = currentValue - 1;
            field.onChange(newValue.toString());
          }
        };

        return (
          <TextField
            {...field}
            label={label}
            type="number"
            onChange={handleChange}
            error={hasError}
            helperText={helperText}
            fullWidth={fullWidth}
            sx={numberInputStyles}
            slotProps={{
              input: {
                endAdornment: (
                  <NumberInputButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
                ),
              },
            }}
          />
        );
      }}
    />
  );
});

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxLength: PropTypes.number,
  fullWidth: PropTypes.bool,
};

NumberInput.displayName = 'NumberInput';

export default NumberInput;
