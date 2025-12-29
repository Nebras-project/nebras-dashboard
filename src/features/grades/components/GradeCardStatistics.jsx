// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation, useReduxTheme } from '@hooks';
import { customBackgrounds } from '@theme/colors';
import { padding } from '@constants';
import { borderRadius } from '@theme/components';
import GradeCardStatItem from './GradeCardStatItem';

/**
 * Get styles for the statistics container
 * @param {string} mode - Theme mode ('light' | 'dark')
 * @param {boolean} isDark - Whether theme is dark
 * @returns {Object} Style object
 */
const getStatisticsContainerStyles = (mode, isDark) => ({
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: borderRadius.xs,
  bgcolor: isDark ? customBackgrounds[mode].surface.level1 : customBackgrounds[mode].surface.level3,
  transition: 'all 0.2s ease',
  ...padding.y.lg,
  ...padding.x.md,
});

/**
 * GradeCardStatistics Component
 *
 * Single Responsibility: Display grade statistics (subjects, units, students)
 */
function GradeCardStatistics({ subjectCount, unitsCount, studentsCount }) {
  const { t } = useTranslation();
  const { mode, isDark } = useReduxTheme();

  return (
    <Box sx={getStatisticsContainerStyles(mode, isDark)}>
      <GradeCardStatItem icon="book" value={subjectCount} label={t('grade.subjects')} />
      <GradeCardStatItem icon="libraryBooks" value={unitsCount} label={t('grade.units')}  />
      <GradeCardStatItem icon="groups" value={studentsCount} label={t('students.students')} />
    </Box>
  );
}

GradeCardStatistics.propTypes = {
  subjectCount: PropTypes.number,
  unitsCount: PropTypes.number,
  studentsCount: PropTypes.number,
};

export default GradeCardStatistics;
