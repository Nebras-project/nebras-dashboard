// external imports
import { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, useTheme, TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// internal imports
import { useTranslation } from '@hooks';
import { Icon } from '@components';
import { getPhoneRules } from '../constants';
import { useFormFieldError } from '../hooks';
import { FORM_DEFAULTS } from '../constants';

/**
 * Format phone number with spaces: 771 644 513
 * @param {string} value - Phone number value
 * @returns {string} Formatted phone number
 */
const formatPhoneNumber = (value) => {
  if (!value) return '';
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '');
  // Limit to 9 digits
  const limitedDigits = digitsOnly.slice(0, 9);
  // Add space after every 3 digits
  return limitedDigits.replace(/(\d{3})(?=\d)/g, '$1 ');
};

/**
 * PhoneInput Component
 *
 * Single Responsibility: Phone number input field with built-in validation, formatting, and icon
 */
const PhoneInput = memo(function PhoneInput({
  name = 'PhoneNumber',
  label,
  rules,
  defaultValue = FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
  ...textFieldProps
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { control } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);

  // Determine icon color based on error state
  const iconColor = hasError ? theme.palette.error.main : theme.palette.primary.main;

  // Merge default phone rules with custom rules (custom rules take precedence)
  const mergedRules = useMemo(() => {
    const defaultRules = getPhoneRules(t, label);
    return rules ? { ...defaultRules, ...rules } : defaultRules;
  }, [t, label, rules]);

  // Handle input change with formatting
  const handleChange = useCallback(
    (onChange) => (e) => {
      const formattedValue = formatPhoneNumber(e.target.value);
      onChange(formattedValue);
    },
    []
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={mergedRules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          {...textFieldProps}
          label={label || t('forms.phoneNumber')}
          type="tel"
          error={hasError}
          helperText={helperText}
          fullWidth={textFieldProps.fullWidth !== false}
          margin={textFieldProps.margin || 'normal'}
          onChange={handleChange(field.onChange)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon name="phone" size={20} color={iconColor} />
              </InputAdornment>
            ),
            ...textFieldProps.InputProps,
          }}
        />
      )}
    />
  );
});

PhoneInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
};

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
