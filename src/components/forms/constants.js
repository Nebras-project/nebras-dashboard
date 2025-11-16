/**
 * Form Component Constants
 *
 * Single Responsibility: Centralize form-related constants and defaults
 */

export const FORM_DEFAULTS = {
  MODE: 'page',
  DIALOG_MAX_WIDTH: 'sm',
  SHOW_CLOSE_BUTTON: true,
  DISABLE_BACKDROP_CLICK: false,
  TEXT_INPUT_DEFAULT_VALUE: '',
  CHECKBOX_DEFAULT_VALUE: false,
  SELECT_DEFAULT_VALUE: '',
  RADIO_DEFAULT_VALUE: '',
  FILE_INPUT_SINGLE_DEFAULT: null,
  FILE_INPUT_MULTIPLE_DEFAULT: [],
};

export const FORM_MARGINS = {
  NORMAL: 'normal',
  DENSE: 'dense',
  NONE: 'none',
};

export const FORM_INPUT_TYPES = {
  // Text types
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  SEARCH: 'search',
  TEL: 'tel',
  URL: 'url',

  // Number types
  NUMBER: 'number',

  // Date/Time types
  DATE: 'date',
  TIME: 'time',
  DATETIME_LOCAL: 'datetime-local',
  MONTH: 'month',
  WEEK: 'week',

  // Other types
  COLOR: 'color',
  RANGE: 'range',
};

// Validation constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  EMAIL_PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_PATTERN: /^7[01378]\d{7}$/, // 9 digits: starts with 7, second digit is 0,1,3,7,8

  PASSWORD_PATTERN:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{}|;:,.<>\/])[A-Za-z\d@$!%*?&#^()_+\-=\[\]{}|;:,.<>\/]+$/, // Contains lowercase, uppercase, number, and special char
};

/**
 * Validation rule generators
 * These functions return React Hook Form validation rules
 */

export const getEmailRules = (t) => ({
  required: t('input.emailRequired'),
  pattern: {
    value: VALIDATION.EMAIL_PATTERN,
    message: t('input.invalidEmail'),
  },
});

export const getPasswordRules = (t, minLength = VALIDATION.PASSWORD_MIN_LENGTH) => ({
  required: t('input.passwordRequired'),
  minLength: {
    value: minLength,
    message: t('input.passwordMinLength', { min: minLength }),
  },
  pattern: {
    value: VALIDATION.PASSWORD_PATTERN,
    message: t('validation.passwordComplexity'),
  },
});

export const getUsernameRules = (t, label, minLength = VALIDATION.USERNAME_MIN_LENGTH) => ({
  required: t('validation.required', { field: label || t('forms.userName') }),
  minLength: {
    value: minLength,
    message: t('validation.minLength', { field: label || t('forms.userName'), min: minLength }),
  },
});

export const getPhoneRules = (t, label) => ({
  required: t('validation.required', { field: label || t('forms.phoneNumber') }),
  validate: (value) => {
    // Remove spaces for validation
    const digitsOnly = value?.replace(/\s/g, '') || '';
    if (digitsOnly.length !== 9) {
      return t('validation.phoneLength');
    }
    if (!digitsOnly.startsWith('7')) {
      return t('validation.phoneFirstDigit');
    }
    const secondDigit = digitsOnly[1];
    if (!['0', '1', '3', '7', '8'].includes(secondDigit)) {
      return t('validation.phoneSecondDigit');
    }
    return true;
  },
});

export const getConfirmPasswordRules = (
  t,
  label,
  passwordRequired = true,
  passwordFieldName = 'password'
) => ({
  required: passwordRequired
    ? t('validation.required', { field: label || t('forms.confirmPassword') })
    : false,
  validate: (value, formValues) => {
    if (passwordRequired && value !== formValues[passwordFieldName]) {
      return t('validation.passwordsDoNotMatch');
    }
    return true;
  },
});
