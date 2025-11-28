// external imports
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon } from '@components';
import { gap } from '@constants';
import { useLanguage } from '@hooks';

function UnitSummaryInfo({ unitName, lessonsCount, lessonsLabel }) {
  const { isRTL } = useLanguage();
  const arrow = isRTL ? '←' : '→';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...gap.sm }}>
      <Icon name="libraryBooks" size={24} color="primary" />
      <Typography variant="subtitle1" fontWeight={600}>
        {unitName}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {arrow} {lessonsCount} {lessonsLabel}
      </Typography>
    </Box>
  );
}

UnitSummaryInfo.propTypes = {
  unitName: PropTypes.string.isRequired,
  lessonsCount: PropTypes.number.isRequired,
  lessonsLabel: PropTypes.string.isRequired,
};

export default UnitSummaryInfo;
