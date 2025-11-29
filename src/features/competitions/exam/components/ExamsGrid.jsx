import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Loader, EmptyState } from '@components';
import { useTranslation } from '@hooks';
import ExamCard from './ExamCard';

function ExamsGrid({ exams, competitionId, isLoading }) {
  const { t } = useTranslation();

  if (isLoading) {
    return <Loader />;
  }

  // Empty state
  if (!exams || exams.length === 0) {
    return (
      <EmptyState
        icon="quiz"
        title={t('competitions.noExamsTitle')}
        description={t('competitions.noExamsDescription')}
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {exams.map((exam) => (
        <Grid size={{ mobile: 12, tablet: 6, desktop: 6 }} key={exam.id || exam.name}>
          <ExamCard exam={exam} competitionId={competitionId} />
        </Grid>
      ))}
    </Grid>
  );
}

ExamsGrid.propTypes = {
  exams: PropTypes.array.isRequired,
  competitionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool,
};

export default ExamsGrid;
