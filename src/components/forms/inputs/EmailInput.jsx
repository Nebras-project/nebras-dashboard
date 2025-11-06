// external imports
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation } from '@hooks';
import { getEmailRules } from '../constants';
import TextInput from './TextInput';

/**
 * EmailInput Component
 *
 * Single Responsibility: Email input field with built-in email validation
 */
const EmailInput = memo(function EmailInput({
  name,
  label,
  rules,
  autoComplete = 'email',
  type = 'email',
  ...textFieldProps
}) {
  const { t } = useTranslation();

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
      {...textFieldProps}
    />
  );
});

EmailInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  autoComplete: PropTypes.string,
  type: PropTypes.string,
};

EmailInput.displayName = 'EmailInput';

export default EmailInput;
