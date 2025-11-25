// external imports
import { Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// internal imports
import { getCurriculumName } from '../utils';
import { useDeleteCurriculum } from '../hooks';
import { useReduxTheme, useLanguage } from '@hooks';
import { borderColors } from '@theme/colors';
import { NAVIGATION_PATHS } from '@config';
import CardActionsMenu from './CardActionsMenu';
import CurriculumCardImage from './CurriculumCardImage';
import CurriculumCardName from './CurriculumCardName';
import CurriculumCardStatistics from './CurriculumCardStatistics';
import { padding } from '@constants';

/**
 * CurriculumCard Component
 *
 * Single Responsibility: Display curriculum information in a card format
 */
function CurriculumCard({ curriculum, onEdit }) {
  const navigate = useNavigate();
  const { deleteCurriculum } = useDeleteCurriculum();
  const { mode } = useReduxTheme();
  const { currentLanguage } = useLanguage();

  const curriculumName = getCurriculumName(curriculum, currentLanguage);

  const handleView = () => {
    navigate(NAVIGATION_PATHS.CURRICULUMS.BY_ID(curriculum.id));
  };

  const handleEdit = () => {
    onEdit?.(curriculum);
  };

  const handleDelete = () => {
    deleteCurriculum(curriculum);
  };

  return (
    <Card 
      sx={{
        border: `1px solid ${borderColors[mode]}`,
        bgcolor: 'background.default',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={handleView}
    >
      {/* Actions Menu - Three Dots */}
      <CardActionsMenu
        curriculum={curriculum}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Curriculum Image */}
      <CurriculumCardImage imageUrl={curriculum.image} alt={curriculumName} />

      <CardContent
        sx={{
          flexGrow: 1,
          ...padding.all.lg,
        }}
      >
        {/* Curriculum Name */}
        <CurriculumCardName name={curriculumName} />

        {/* Statistics */}
        <CurriculumCardStatistics
          lessonsCount={curriculum.lessonsCount}
          unitsCount={curriculum.unitsCount}
          studentsCount={curriculum.studentsCount}
        />
      </CardContent>
    </Card>
  );
}

CurriculumCard.propTypes = {
  curriculum: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
};

export default CurriculumCard;
