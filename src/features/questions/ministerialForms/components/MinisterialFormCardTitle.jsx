// external imports
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * MinisterialFormCardTitle Component
 *
 * Single Responsibility: Display ministerial form number and year as title
 */
function MinisterialFormCardTitle({ formNumber, year }) {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} color="text.secondary">
        {formNumber} - {year}
      </Typography>
    </Box>
  );
}

MinisterialFormCardTitle.propTypes = {
  formNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MinisterialFormCardTitle;
