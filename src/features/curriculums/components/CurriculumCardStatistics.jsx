// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation, useReduxTheme } from '@hooks';
import { customBackgrounds } from '@theme/colors';
import { padding } from '@constants';
import { borderRadius } from '@theme/components';
import CurriculumCardStatItem from './CurriculumCardStatItem';

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
 * CurriculumCardStatistics Component
 *
 * Single Responsibility: Display curriculum statistics (lessons, units, students)
 */
function CurriculumCardStatistics({ lessonsCount, unitsCount, studentsCount }) {
  const { t } = useTranslation();
  const { mode, isDark } = useReduxTheme();

  return (
    <Box sx={getStatisticsContainerStyles(mode, isDark)}>
      <CurriculumCardStatItem icon="book" value={lessonsCount} label={t('curriculum.lessons')} />
      <CurriculumCardStatItem
        icon="libraryBooks"
        value={unitsCount}
        label={t('curriculum.units')}
      />
      <CurriculumCardStatItem icon="groups" value={studentsCount} label={t('students.students')} />
    </Box>
  );
}

CurriculumCardStatistics.propTypes = {
  lessonsCount: PropTypes.number,
  unitsCount: PropTypes.number,
  studentsCount: PropTypes.number,
};

export default CurriculumCardStatistics;
