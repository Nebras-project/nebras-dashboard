import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import { useReduxTheme } from '@hooks';
import ExamCardHeader from './ExamCardHeader';
import ExamCardDetails from './ExamCardDetails';
import ExamForm from './ExamForm';
import { useExamCard } from '../hooks';
import { getCardStyles } from '@constants/layout';

function ExamCard({ exam, competitionId }) {
  const { mode } = useReduxTheme();
  const { formOpen, handleViewResults, handleEdit, handleDelete, handleFormClose } = useExamCard(
    exam,
    competitionId
  );

  return (
    <>
      <Card sx={getCardStyles(mode, { position: 'relative' })}>
        <ExamCardHeader
          exam={exam}
          competitionId={competitionId}
          onViewResults={handleViewResults}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ExamCardDetails exam={exam} />
      </Card>

      <ExamForm
        mode="dialog"
        open={formOpen}
        onClose={handleFormClose}
        defaultValues={exam}
        isEdit={true}
      />
    </>
  );
}

ExamCard.propTypes = {
  exam: PropTypes.object.isRequired,
  competitionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ExamCard;
