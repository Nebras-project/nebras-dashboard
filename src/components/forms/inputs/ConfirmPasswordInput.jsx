// external imports
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation } from '@hooks';
import { getConfirmPasswordRules } from '../constants';
import PasswordInput from './PasswordInput';

/**
 * ConfirmPasswordInput Component
 *
 * Single Responsibility: Confirm password input field with built-in validation
 * Uses PasswordInput component to avoid duplication
 */
const ConfirmPasswordInput = memo(function ConfirmPasswordInput({
  name = 'confirmPassword',
  label,
  rules,
  autoComplete = 'new-password',
  showVisibilityToggle = true,
  passwordRequired = true,
  passwordFieldName = 'password',
  ...passwordInputProps
}) {
  const { t } = useTranslation();

  // Merge default confirm password rules with custom rules (custom rules take precedence)
  const mergedRules = useMemo(() => {
    const defaultRules = getConfirmPasswordRules(t, label, passwordRequired, passwordFieldName);
    return rules ? { ...defaultRules, ...rules } : defaultRules;
  }, [t, label, passwordRequired, passwordFieldName, rules]);

  return (
    <PasswordInput
      name={name}
      label={label || t('forms.confirmPassword')}
      autoComplete={autoComplete}
      showVisibilityToggle={showVisibilityToggle}
      rules={mergedRules}
      required={passwordRequired}
      {...passwordInputProps}
    />
  );
});

ConfirmPasswordInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  autoComplete: PropTypes.oneOf(['current-password', 'new-password', 'off']),
  showVisibilityToggle: PropTypes.bool,
  passwordRequired: PropTypes.bool,
  passwordFieldName: PropTypes.string,
};

ConfirmPasswordInput.displayName = 'ConfirmPasswordInput';

export default ConfirmPasswordInput;
