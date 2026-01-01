// external imports
import { Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// internal imports
import { getGradeName } from '../utils';
import { useDeleteGrade } from '../hooks';
import { useReduxTheme } from '@hooks';
import { NAVIGATION_PATHS } from '@config';
import CardActionsMenu from './CardActionsMenu';
import GradeCardImage from './GradeCardImage';
import GradeCardName from './GradeCardName';
import GradeCardStatistics from './GradeCardStatistics';
import { padding } from '@constants';
import { getCardStyles } from '@constants/layout';

/**
 * GradeCard Component
 *
 * Single Responsibility: Display grade information in a card format
 */
function GradeCard({ grade, onEdit }) {
  const navigate = useNavigate();
  const { deleteGrade } = useDeleteGrade();
  const { mode } = useReduxTheme();


  const gradeName = getGradeName(grade);

  const handleView = () => {
    navigate(NAVIGATION_PATHS.GRADES.BY_ID(grade.id));
  };

  const handleEdit = () => {
    onEdit?.(grade);
  };

  const handleDelete = () => {
    deleteGrade(grade);
  };

  return (
    <Card
      sx={getCardStyles(mode, { position: 'relative', cursor: 'pointer' })}
      onClick={handleView}
    >
      {/* Actions Menu - Three Dots */}
      <CardActionsMenu
        grade={grade}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Grade Image */}
      <GradeCardImage imageUrl={grade.image} alt={gradeName} />

      <CardContent
        sx={{
          flexGrow: 1,
          ...padding.all.lg,
        }}
      >
        {/* Grade Name */}
        <GradeCardName name={gradeName} />

        {/* Statistics */}
        <GradeCardStatistics subjectCount={grade.subjectCount} studentsCount={grade.studentCount} />
      </CardContent>
    </Card>
  );
}

GradeCard.propTypes = {
  grade: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
};

export default GradeCard;
