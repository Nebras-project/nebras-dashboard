// external imports
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Loader, EmptyState } from '@components';
import { useTranslation } from '@hooks';
import GradeCard from './GradeCard';
import { margin } from '@constants';

/**
 * GradesGrid Component
 *
 * Single Responsibility: Display grades in a grid layout
 */
function GradesGrid({ grades, isLoading, onEdit }) {
  const { t } = useTranslation();

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  // Empty state
  if (!grades || grades.length === 0) {
    return (
      <EmptyState
        icon="book"
        title={t('grade.noGrades')}
        description={t('grade.noGradesDescription')}
      />
    );
  }

  return (
    <Grid container spacing={3} sx={{ ...margin.top.xl }}>
      {grades.map((grade) => (
        <Grid size={{ mobile: 12, tablet: 6, desktop: 4, widescreen: 3 }} key={grade.id}>
          <GradeCard grade={grade} onEdit={onEdit} />
        </Grid>
      ))}
    </Grid>
  );
}

GradesGrid.propTypes = {
  grades: PropTypes.array,
  isLoading: PropTypes.bool,
  onEdit: PropTypes.func,
};

export default GradesGrid;
