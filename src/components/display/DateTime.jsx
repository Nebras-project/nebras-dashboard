// external imports
import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import PropTypes from 'prop-types';

// internal imports
import { useLanguage } from '@hooks';
import { gap } from '@constants';
import { fontWeights } from '@theme';

// Extend dayjs with plugins
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);

// Configure Arabic locale to use Arabic-Indic numerals
dayjs.updateLocale('ar', {
  postformat: (string) => {
    return string.replace(/\d/g, (match) => '٠١٢٣٤٥٦٧٨٩'[match]);
  },
});

function DateTime({ align = 'right' }) {
  const { isRTL, resolvedLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(dayjs()); // current time

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 60000); // update current time every minute
    return () => clearInterval(timer);
  }, []);

  const locale = resolvedLanguage; // 'ar' or 'en'
  const formattedDate = currentTime.locale(locale).format('D MMMM YYYY');
  const dayName = currentTime.locale(locale).format('dddd');
  const formattedTime = currentTime.locale(locale).format('h:mm A');
  const timeWithDay = `${dayName}، ${formattedTime}`;

  const getAlignment = () => {
    if (align === 'center') return 'center';

    // In RTL mode, flexbox directions are reversed
    if (isRTL) {
      return align === 'left' ? 'flex-end' : 'flex-start';
    }

    // In LTR mode, standard flexbox behavior
    return align === 'left' ? 'flex-start' : 'flex-end';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: getAlignment(),
        ...gap.xxs,
        minWidth: 200,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontWeight: fontWeights.medium,
          textAlign: align === 'center' ? 'center' : isRTL ? 'left' : align,
        }}
      >
        {formattedDate}
      </Typography>
      <Typography
        variant="h6"
        color="primary.main"
        sx={{
          fontWeight: fontWeights.medium,
          textAlign: align === 'center' ? 'center' : 'inherit',
        }}
      >
        {timeWithDay}
      </Typography>
    </Box>
  );
}

DateTime.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center']),
};

export default DateTime;
