// external imports
import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';
import { useFormContext } from '../hooks';
import dayjs from 'dayjs';

// internal imports
import { useFormFieldError } from '../hooks';
import { useLanguage } from '@hooks';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';

/**
 * DateInput Component
 *
 * Single Responsibility: Render a date picker input field integrated with React Hook Form
 */
function DateInput({ name, label, rules, ...props }) {
  const { control } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);
  const { currentLanguage } = useLanguage();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLanguage}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <DatePicker
            {...field}
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => {
              field.onChange(date ? date.format('YYYY-MM-DD') : '');
            }}
            slotProps={{
              textField: {
                error: hasError,
                helperText: helperText,
                fullWidth: true,
                ...props,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
};

export default DateInput;
