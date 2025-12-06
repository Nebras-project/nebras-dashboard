// external imports
import { useState } from 'react';
import PropTypes from 'prop-types';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';
import { useFormContext } from '../hooks';
import { TextField, Popover, InputAdornment, useTheme } from '@mui/material';
import dayjs from 'dayjs';

// internal imports
import { useFormFieldError } from '../hooks';
import { useLanguage } from '@hooks';
import { Icon } from '@components';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';

/**
 * YearInput Component
 *
 * Single Responsibility: Render a year picker input field integrated with React Hook Form
 * Uses YearCalendar component for year selection
 */
function YearInput({ name, label, rules, ...props }) {
  const { control } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);
  const { currentLanguage } = useLanguage();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLanguage}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          // Convert year value to dayjs object
          const getYearValue = () => {
            if (!field.value) return null;
            const yearValue =
              typeof field.value === 'number' ? field.value : parseInt(field.value, 10);
            if (isNaN(yearValue)) return null;
            return dayjs().year(yearValue).startOf('year');
          };

          const handleYearChange = (newYear) => {
            if (newYear) {
              field.onChange(newYear.year().toString());
              field.onBlur(); // Trigger blur for validation
              handleClose(); // Close immediately
            }
          };

          return (
            <>
              <TextField
                {...field}
                label={label}
                value={field.value || ''}
                onClick={handleClick}
                onFocus={handleClick}
                error={hasError}
                helperText={helperText}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon
                          name="dateRange"
                          size={20}
                          style={{ color: theme.palette.primary.main, cursor: 'pointer' }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                {...props}
              />

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                slotProps={{
                  paper: {
                    sx: { zIndex: 1400, marginTop: 1 },
                  },
                }}
                disableRestoreFocus
              >
                <YearCalendar value={getYearValue()} onChange={handleYearChange} />
              </Popover>
            </>
          );
        }}
      />
    </LocalizationProvider>
  );
}

YearInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
};

export default YearInput;
