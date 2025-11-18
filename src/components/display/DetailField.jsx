// external imports
import { Grid, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { gap } from '@constants';

/**
 * DetailField Component
 *
 * Single Responsibility: Display a single detail field with label and value
 * Reusable component for displaying entity details in cards
 *
 * @param {string} label - Field label (translation key or text)
 * @param {string|number} value - Field value to display
 * @param {number} xs - Grid xs breakpoint (default: 12)
 * @param {number} sm - Grid sm breakpoint (default: 6)
 */
function DetailField({ label, value, mobile = 12, desktop = 6 }) {
  return (
    <Grid item size={{ mobile, desktop }}>
      <Box sx={{ ...gap.xs }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {value || 'N/A'}
        </Typography>
      </Box>
    </Grid>
  );
}

DetailField.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mobile: PropTypes.number,
  desktop: PropTypes.number,
};

export default DetailField;
