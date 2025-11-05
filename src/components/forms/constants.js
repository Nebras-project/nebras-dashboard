/**
 * Form Component Constants
 *
 * Single Responsibility: Centralize form-related constants and defaults
 */

export const FORM_DEFAULTS = {
  MODE: 'page',
  DIALOG_MAX_WIDTH: 'mobile',
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
