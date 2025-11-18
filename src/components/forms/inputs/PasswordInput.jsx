// external imports
import { memo, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, IconButton, Tooltip, useTheme } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { Icon } from '@components';
import { getPasswordRules } from '../constants';
import { useFormFieldError } from '../hooks';
import TextInput from './TextInput';

/**
 * PasswordVisibilityToggle Component
 * Single Responsibility: Toggle password visibility with tooltip
 */
function PasswordVisibilityToggle({ showPassword, onToggle, hasError }) {
  const { t } = useTranslation();
  const theme = useTheme();

  const tooltipTitle = showPassword ? t('input.hidePassword') : t('input.showPassword');
  const iconName = showPassword ? 'eye' : 'eyeClosed';

  // Determine icon color based on error state
  const iconColor = hasError ? theme.palette.error.main : theme.palette.primary.main;

  return (
    <InputAdornment position="end">
      <Tooltip title={tooltipTitle} arrow placement="top">
        <IconButton onClick={onToggle} edge="end" aria-label={tooltipTitle} size="small">
          <Icon name={iconName} size={18} color={iconColor} />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
}

PasswordVisibilityToggle.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
};

/**
 * PasswordInput Component
 *
 * Single Responsibility: Password input field with built-in password validation and visibility toggle
 */
const PasswordInput = memo(function PasswordInput({
  name = 'Password',
  label,
  rules,
  autoComplete = 'current-password',
  showVisibilityToggle = true,
  minLength,
}) {
  const { t } = useTranslation();
  const { hasError } = useFormFieldError(name);
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Merge default password rules with custom rules (custom rules take precedence)
  const mergedRules = useMemo(() => {
    const defaultRules = getPasswordRules(t, minLength);
    return rules ? { ...defaultRules, ...rules } : defaultRules;
  }, [t, rules, minLength]);

  // Build InputProps with visibility toggle
  const inputProps = useMemo(() => {
    if (showVisibilityToggle) {
      return {
        endAdornment: (
          <PasswordVisibilityToggle
            showPassword={showPassword}
            onToggle={togglePasswordVisibility}
            hasError={hasError}
          />
        ),
      };
    }

    return null;
  }, [showVisibilityToggle, showPassword, togglePasswordVisibility, hasError]);

  return (
    <TextInput
      name={name}
      label={label || t('input.password')}
      type={showPassword ? 'text' : 'password'}
      autoComplete={autoComplete}
      rules={mergedRules}
      InputProps={inputProps}
    />
  );
});

PasswordInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  autoComplete: PropTypes.oneOf(['current-password', 'new-password', 'off']),
  showVisibilityToggle: PropTypes.bool,
  minLength: PropTypes.number,
};

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
