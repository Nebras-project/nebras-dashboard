// external imports
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';

// Extend dayjs with plugins (only runs once on import)
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);

// Configure Arabic locale to use Arabic-Indic numerals
dayjs.updateLocale('ar', {
  postformat: (string) => {
    return string.replace(/\d/g, (match) => '٠١٢٣٤٥٦٧٨٩'[match]);
  },
});

export const getLocalizedDayjs = (locale) => {
  return dayjs().locale(locale);
};

export const formatDate = (date, locale, format) => {
  return date.locale(locale).format(format);
};

export const getDateSeparator = (locale) => {
  return locale === 'ar' ? '، ' : ', ';
};

// Re-export dayjs for convenience
export { dayjs };
