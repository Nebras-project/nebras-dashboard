// external imports
import { useState, useEffect, useMemo } from 'react';

// internal imports
import { dayjs, formatDate, getDateSeparator } from '@utils';

// Constants
const TIMER_INTERVAL_MS = 60000; // 1 minute

export const useDateTime = (locale) => {
  const [currentTime, setCurrentTime] = useState(() => dayjs());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, TIMER_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  // Memoize formatted values to avoid recalculation
  const formattedValues = useMemo(() => {
    const formattedDate = formatDate(currentTime, locale, 'D MMMM YYYY');
    const dayName = formatDate(currentTime, locale, 'dddd');
    const formattedTime = formatDate(currentTime, locale, 'h:mm A');
    const separator = getDateSeparator(locale);
    const timeWithDay = `${dayName}${separator}${formattedTime}`;

    return {
      formattedDate,
      dayName,
      formattedTime,
      timeWithDay,
    };
  }, [currentTime, locale]);

  return formattedValues;
};
