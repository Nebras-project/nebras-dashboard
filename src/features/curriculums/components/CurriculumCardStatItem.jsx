// external imports
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';

// internal imports
import { Icon } from '@components';
import { useReduxTheme } from '@hooks';
import { shadows, borderRadius } from '@theme/components';
import { fontWeights } from '@theme/typography';
import { margin } from '@constants';

/**
 * Get styles for the stat item container
 * @returns {Object} Style object
 */
const getStatItemContainerStyles = () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
});

/**
 * Get styles for the icon container
 * @param {string} mode - Theme mode ('light' | 'dark')
 * @returns {Object|Function} Style object or function that accepts theme
 */
const getIconContainerStyles = (mode) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 44,
  height: 44,
  borderRadius: borderRadius.xs,
  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
  color: 'primary.main',
  boxShadow: shadows[mode].sm,
  ...margin.bottom.md,
});

/**
 * Get styles for the label text
 * @returns {Object} Style object
 */
const getLabelStyles = () => ({
  textTransform: 'uppercase',
});

/**
 * CurriculumCardStatItem Component
 *
 * Single Responsibility: Display a single statistic item (icon, value, label) for curriculum card
 */
function CurriculumCardStatItem({ icon, value, label }) {
  const { mode } = useReduxTheme();

  return (
    <Box sx={getStatItemContainerStyles()}>
      <Box sx={getIconContainerStyles(mode)}>
        <Icon name={icon} size={20} />
      </Box>
      <Typography variant="h5" fontWeight={fontWeights.bold} color="text.primary">
        {value || 0}
      </Typography>

      <Typography variant="caption" color="text.secondary" sx={getLabelStyles()}>
        {label}
      </Typography>
    </Box>
  );
}

CurriculumCardStatItem.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.number,
  label: PropTypes.string.isRequired,
};

export default CurriculumCardStatItem;
