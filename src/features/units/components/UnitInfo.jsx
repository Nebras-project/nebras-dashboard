// external imports
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon } from '@components';
import { gap } from '@constants';

function UnitInfo({ unitName, lessonsCount, lessonsLabel }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...gap.sm }}>
      <Icon name="libraryBooks" size={24} color="primary" />
      <Box>
        <Typography variant="h6" fontWeight={600}>
          {unitName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {lessonsCount} {lessonsLabel}
        </Typography>
      </Box>
    </Box>
  );
}

UnitInfo.propTypes = {
  unitName: PropTypes.string.isRequired,
  lessonsCount: PropTypes.number.isRequired,
  lessonsLabel: PropTypes.string.isRequired,
};

export default UnitInfo;

