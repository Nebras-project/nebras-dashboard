// external imports
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, useTheme } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { Icon } from '@components';
import { getUsernameRules } from '../constants';
import { useFormFieldError } from '../hooks';
import TextInput from './TextInput';

/**
 * UsernameInput Component
 *
 * Single Responsibility: Username input field with built-in validation and icon
 */
const UsernameInput = memo(function UsernameInput({
  name = 'UserName',
  label,
  rules,
  ...textFieldProps
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { hasError } = useFormFieldError(name);

  // Determine icon color based on error state
  const iconColor = hasError ? theme.palette.error.main : theme.palette.primary.main;

  // Merge default username rules with custom rules (custom rules take precedence)
  const mergedRules = useMemo(() => {
    const defaultRules = getUsernameRules(t, label);
    return rules ? { ...defaultRules, ...rules } : defaultRules;
  }, [t, label, rules]);

  return (
    <TextInput
      name={name}
      label={label || t('forms.userName')}
      rules={mergedRules}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Icon name="person" size={20} color={iconColor} />
          </InputAdornment>
        ),
        ...textFieldProps.InputProps,
      }}
      {...textFieldProps}
    />
  );
});

UsernameInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
};

UsernameInput.displayName = 'UsernameInput';

export default UsernameInput;
