export const isRTL = (language) => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(language);
};

export const getDirection = (language) => {
  return isRTL(language) ? 'rtl' : 'ltr';
};

export const getTextAlign = (direction) => {
  return direction === 'rtl' ? 'right' : 'left';
};

export const getFlexDirection = (direction, baseDirection = 'row') => {
  if (direction === 'rtl' && baseDirection === 'row') {
    return 'row-reverse';
  }
  if (direction === 'ltr' && baseDirection === 'row-reverse') {
    return 'row';
  }
  return baseDirection;
};

/**
 * Detect if current environment (document / i18n) is RTL.
 * Optional `t` is used when available to respect app-level direction.
 */
export const isRtlEnvironment = (t) => {
  if (typeof t === 'function') {
    const dirFromT = t('common.langDirection');
    if (dirFromT === 'rtl') return true;
    if (dirFromT === 'ltr') return false;
  }

  if (typeof document !== 'undefined') {
    const dir = (document.documentElement.dir || '').toLowerCase();
    if (dir === 'rtl') return true;
    if (dir === 'ltr') return false;

    const lang = (document.documentElement.lang || '').toLowerCase();
    if (lang) return isRTL(lang.split('-')[0]);
  }

  return false;
};

/**
 * Shared phone renderer factory for tables.
 * Forces LTR display for phone numbers only when environment is RTL.
 */
export const createPhoneRenderer =
  (t) =>
  ({ value }) => {
    if (!value) return '-';
    const isRtl = isRtlEnvironment(t);

    const style = isRtl
      ? {
          direction: 'ltr',
          unicodeBidi: 'bidi-override',
        }
      : undefined;

    // Use plain JS (no JSX) to keep this file valid JS for Vite import analysis
    // and to avoid needing a JSX transform in utils.
    return {
      $$typeof: Symbol.for('react.element'),
      type: 'span',
      key: null,
      ref: null,
      props: { style, children: value },
      _owner: null,
      _store: {},
    };
  };
