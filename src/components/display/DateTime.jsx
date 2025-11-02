// external imports
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useLanguage, useDateTime } from '@hooks';
import { gap } from '@constants';
import { fontWeights } from '@theme';

const getFlexAlignment = (align, isRTL) => {
  if (align === 'center') return 'center';

  // In RTL mode, flexbox directions are reversed
  if (isRTL) {
    return align === 'left' ? 'flex-end' : 'flex-start';
  }

  // In LTR mode, standard flexbox behavior
  return align === 'left' ? 'flex-start' : 'flex-end';
};

const getTextAlignment = (align, isRTL) => {
  if (align === 'center') return 'center';
  return isRTL ? 'left' : align;
};

function DateTime({ align = 'right' }) {
  const { isRTL, resolvedLanguage } = useLanguage();
  const { formattedDate, timeWithDay } = useDateTime(resolvedLanguage);

  const flexAlignment = getFlexAlignment(align, isRTL);
  const textAlignment = getTextAlignment(align, isRTL);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: flexAlignment,
        ...gap.xxs,
        minWidth: 200,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontWeight: fontWeights.medium,
          textAlign: textAlignment,
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
