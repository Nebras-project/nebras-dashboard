// external imports
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { useFormContext } from '../hooks';
import { TextField, InputAdornment, useTheme } from '@mui/material';

// internal imports
import { useFormFieldError } from '../hooks';
import { TimePickerDialog, Icon } from '@components';

/**
 * TimeInput Component
 *
 * Single Responsibility: Render a time picker input field integrated with React Hook Form
 * Displays time as a clock interface using StaticTimePicker in a Dialog when clicking on the field
 */
function TimeInput({ name, label, rules, ...props }) {
  const { control } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <TextField
            label={label}
            value={field.value || ''}
            error={hasError}
            helperText={helperText}
            fullWidth
            onClick={() => setOpen(true)}
            slotProps={{
              input: {
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon
                      name="clock"
                      size={20}
                      style={{ color: theme.palette.primary.main, cursor: 'pointer' }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            {...props}
          />
          <TimePickerDialog
            open={open}
            onClose={() => setOpen(false)}
            value={field.value}
            onChange={field.onChange}
          />
        </>
      )}
    />
  );
}

TimeInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  sx: PropTypes.object,
};

export default TimeInput;
