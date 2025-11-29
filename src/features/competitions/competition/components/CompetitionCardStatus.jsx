import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { useReduxTheme } from '@hooks';

/**
 * Get the color for the competition status chip
 * @param {string} status - The preparation status
 * @returns {string} MUI Chip color prop value
 */
const getStatusColor = (status) => {
  if (!status) return 'default';

  const statusLower = status.toLowerCase();

  // Arabic status mappings
  const arabicStatusMap = {
    نشطة: 'success',
    'قيد التحضير': 'warning',
    منتهية: 'default',
    مغلقة: 'error',
  };

  // English status mappings
  const englishStatusMap = {
    active: 'success',
    'in preparation': 'warning',
    completed: 'default',
    closed: 'error',
  };

  // Check Arabic first
  if (arabicStatusMap[status]) {
    return arabicStatusMap[status];
  }

  // Check English
  if (englishStatusMap[statusLower]) {
    return englishStatusMap[statusLower];
  }

  // Default fallback
  return 'default';
};

function CompetitionCardStatus({ competition }) {
  const { isDark } = useReduxTheme();

  if (!competition.preparationStatus) {
    return null;
  }

  const statusColor = getStatusColor(competition.preparationStatus);

  return (
    <Chip
      label={competition.preparationStatus}
      size="small"
      color={statusColor}
      variant={isDark ? 'outlined' : 'filled'}
    />
  );
}

CompetitionCardStatus.propTypes = {
  competition: PropTypes.object.isRequired,
};

export default CompetitionCardStatus;
