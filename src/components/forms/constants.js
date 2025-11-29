/**
 * Form Component Constants
 *
 * Single Responsibility: Centralize form-related constants and defaults
 */

import dayjs from 'dayjs';

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
  USERNAME_MIN_LENGTH: 3,
  EMAIL_PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_PATTERN: /^7[01378]\d{7}$/, // 9 digits: starts with 7, second digit is 0,1,3,7,8

  PASSWORD_PATTERN:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{}|;:,.<>/])[A-Za-z\d@$!%*?&#^()_+\-=[\]{}|;:,.<>/]+$/, // Contains lowercase, uppercase, number, and special char
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

export const getPasswordRules = (t, minLength = 8) => ({
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

/**
 * Get validation rules for a text input field
 * Supports required and minLength validation
 *
 * @param {Function} t - Translation function
 * @param {string} label - Field label for error messages
 * @param {Object} options - Validation options
 * @param {boolean} options.required - Whether the field is required (default: true)
 * @param {number} options.minLength - Minimum length requirement (optional)
 * @param {number} options.maxLength - Maximum length requirement (optional)
 * @returns {Object} React Hook Form validation rules
 */
export const getTextRules = (t, label, options = {}) => {
  const { required = true, minLength, maxLength } = options;
  const rules = {};

  if (required) {
    rules.required = t('validation.required', { field: label });
  }

  if (minLength !== undefined) {
    rules.minLength = {
      value: minLength,
      message: t('validation.minLength', { field: label, min: minLength }),
    };
  }

  if (maxLength !== undefined) {
    rules.maxLength = {
      value: maxLength,
      message: t('validation.maxLength', { field: label, max: maxLength }),
    };
  }

  return rules;
};

/**
 * Get validation rules for a number input field.
 *
 * @param {Function} t - Translation function.
 * @param {string} label - Field label for error messages.
 * @param {Object} options - Optional validation options.
 * @param {boolean} [options.required=true] - Whether the field is required.
 * @param {number} [options.min] - Minimum value for the field.
 * @param {number} [options.max] - Maximum value for the field.
 * @returns {Object} React Hook Form validation rules.
 */
export const getNumberRules = (t, label, { required = true, min, max } = {}) => {
  const rules = {};
  if (required) {
    rules.required = t('validation.required', { field: label });
  }
  if (min !== undefined) {
    rules.min = {
      value: min,
      message: t('validation.min', { field: label, min }),
    };
  }
  if (max !== undefined) {
    rules.max = {
      value: max,
      message: t('validation.max', { field: label, max }),
    };
  }
  return rules;
};

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

/**
 * Date Validation Rules
 * General validation rules for date fields
 */

/**
 * Get validation rules for a simple date field
 * Ensures the chosen date is greater than or equal to the current date
 *
 * @param {Function} t - Translation function
 * @param {string} label - Field label for error messages
 * @param {string} errorMessage - Custom error message (optional)
 * @returns {Object} React Hook Form validation rules
 */
export const getDateRules = (t, label, errorMessage = null) => ({
  required: t('validation.required', { field: label }),
  validate: (value) => {
    if (!value) return true;

    const selectedDate = dayjs(value);
    const today = dayjs().startOf('day');

    if (selectedDate.isBefore(today)) {
      return (
        errorMessage ||
        t('validation.dateMustBeGreaterOrEqualCurrentDate', {
          field: label,
        })
      );
    }
    return true;
  },
});

/**
 * Get validation rules for a start date field
 * Uses simple date rules (must be >= current date) and checks against end date
 *
 * @param {Function} t - Translation function
 * @param {string} label - Field label for error messages
 * @param {string} endDateFieldName - Name of the end date field to compare against
 * @param {string} endDateLabel - Label of the end date field for error messages (optional)
 * @returns {Object} React Hook Form validation rules
 */
export const getStartDateRules = (t, label, endDateFieldName = 'endDate', endDateLabel = null) => ({
  required: t('validation.required', { field: label }),
  validate: (value, formValues) => {
    if (!value) return true;

    const selectedDate = dayjs(value);
    const today = dayjs().startOf('day');

    // Check if date is >= current date
    if (selectedDate.isBefore(today)) {
      return t('validation.dateMustBeGreaterOrEqualCurrentDate', {
        field: label,
      });
    }

    // Check if start date is before end date
    const endDate = formValues[endDateFieldName];
    if (endDate) {
      const end = dayjs(endDate);
      if (selectedDate.isAfter(end) || selectedDate.isSame(end, 'day')) {
        return t('validation.startDateMustBeBeforeEndDate', {
          startDate: label,
          endDate: endDateLabel || endDateFieldName,
        });
      }
    }

    return true;
  },
});

/**
 * Get validation rules for an end date field
 * Only checks that the end date is after the start date
 *
 * @param {Function} t - Translation function
 * @param {string} label - Field label for error messages
 * @param {string} startDateFieldName - Name of the start date field to compare against
 * @param {string} startDateLabel - Label of the start date field for error messages (optional)
 * @returns {Object} React Hook Form validation rules
 */
export const getEndDateRules = (
  t,
  label,
  startDateFieldName = 'startDate',
  startDateLabel = null
) => ({
  required: t('validation.required', { field: label }),
  validate: (value, formValues) => {
    if (!value) return true;

    const startDate = formValues[startDateFieldName];
    if (!startDate) return true;

    const start = dayjs(startDate);
    const end = dayjs(value);

    if (end.isBefore(start) || end.isSame(start, 'day')) {
      return t('validation.endDateMustBeAfterStartDate', {
        endDate: label,
        startDate: startDateLabel || startDateFieldName,
      });
    }

    return true;
  },
});

/**
 * Time Validation Rules
 * General validation rules for time fields
 */

/**
 * Get validation rules for a time field
 * Supports required validation and optional time comparison
 *
 * @param {Function} t - Translation function
 * @param {string} label - Field label for error messages
 * @param {Object} options - Validation options
 * @param {boolean} options.required - Whether the field is required (default: true)
 * @param {string} options.compareTimeFieldName - Name of the time field to compare against (optional)
 * @param {string} options.compareTimeLabel - Label of the compare time field for error messages (optional)
 * @param {string} options.comparisonType - 'before' or 'after' (default: 'before')
 * @returns {Object} React Hook Form validation rules
 */
export const getTimeRules = (
  t,
  label,
  {
    required = true,
    compareTimeFieldName = null,
    compareTimeLabel = null,
    comparisonType = 'before',
  } = {}
) => {
  const rules = {};

  if (required) {
    rules.required = t('validation.required', { field: label });
  }

  if (compareTimeFieldName) {
    rules.validate = (value, formValues) => {
      if (!value) return true;

      const compareTime = formValues[compareTimeFieldName];
      if (!compareTime) return true;

      const currentTime = dayjs(value, 'HH:mm');
      const compare = dayjs(compareTime, 'HH:mm');

      if (
        comparisonType === 'before' &&
        (currentTime.isAfter(compare) || currentTime.isSame(compare))
      ) {
        return t('validation.timeMustBeBefore', {
          field: label,
          compareField: compareTimeLabel || compareTimeFieldName,
        });
      }

      if (
        comparisonType === 'after' &&
        (currentTime.isBefore(compare) || currentTime.isSame(compare))
      ) {
        return t('validation.timeMustBeAfter', {
          field: label,
          compareField: compareTimeLabel || compareTimeFieldName,
        });
      }

      return true;
    };
  }

  return rules;
};
