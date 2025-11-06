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
  EMAIL_PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
});
