// external imports
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, useTheme } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { Icon } from '@components';
import { getEmailRules } from '../constants';
import { useFormFieldError } from '../hooks';
import TextInput from './TextInput';

/**
 * EmailInput Component
 *
 * Single Responsibility: Email input field with built-in email validation and icon
 */
const EmailInput = memo(function EmailInput({
  name = 'email',
  label,
  rules,
  autoComplete = 'email',
  type = 'email',
  ...textFieldProps
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { hasError } = useFormFieldError(name);

  // Determine icon color based on error state
  const iconColor = hasError ? theme.palette.error.main : theme.palette.primary.main;

  // Merge default email rules with custom rules (custom rules take precedence)
  const mergedRules = useMemo(() => {
    const defaultRules = getEmailRules(t);
    return rules ? { ...defaultRules, ...rules } : defaultRules;
  }, [t, rules]);

  return (
    <TextInput
      name={name}
      label={label || t('input.email')}
      type={type}
      autoComplete={autoComplete}
      rules={mergedRules}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Icon name="email" size={20} color={iconColor} />
          </InputAdornment>
        ),
        ...textFieldProps.InputProps,
      }}
      {...textFieldProps}
    />
  );
});

EmailInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  autoComplete: PropTypes.string,
  type: PropTypes.string,
};

EmailInput.displayName = 'EmailInput';

export default EmailInput;
