import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import PropTypes from 'prop-types';
import { useLanguage } from '@hooks';

dayjs.extend(localizedFormat);

function PageDateTime({ align = 'right' }) {
  const { isRTL, currentLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 60000);
    return () => clearInterval(timer);
  }, []);

  const locale = currentLanguage === 'ar' ? 'ar' : 'en';
  const formattedDate = currentTime.locale(locale).format('D MMMM YYYY');
  const dayName = currentTime.locale(locale).format('dddd');
  const formattedTime = currentTime.locale(locale).format('h:mm A');
  const timeWithDay = `${dayName}، ${formattedTime}`;

  const getAlignment = () => {
    if (align === 'center') return 'center';
    if (isRTL) return 'flex-start';
    return align === 'right' ? 'flex-end' : 'flex-start';
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: getAlignment(),
        gap: 0.5,
        minWidth: 200,
      }}
    >
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ fontWeight: 500, textAlign: align === 'center' ? 'center' : (isRTL ? 'left' : align) }}
      >
        {formattedDate}
      </Typography>
      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600, textAlign: align === 'center' ? 'center' : 'inherit' }}>
        {timeWithDay}
      </Typography>
    </Box>
  );
}

PageDateTime.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center'])
};

export default PageDateTime;


