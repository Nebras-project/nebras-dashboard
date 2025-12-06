import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import { useReduxTheme } from '@hooks';
import { getCardStyles } from '@constants/layout';
import QuestionCardHeader from './QuestionCardHeader';
import QuestionCardDetails from './QuestionCardDetails';

/**
 * QuestionCard Component
 *
 * Single Responsibility: Render a single question card
 */
function QuestionCard({ question, questionNumber, onEdit, onDelete }) {
  const { mode } = useReduxTheme();

  return (
    <Card sx={getCardStyles(mode, { position: 'relative' })}>
      <QuestionCardHeader
        question={question}
        questionNumber={questionNumber}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <QuestionCardDetails question={question} />
    </Card>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  questionNumber: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default QuestionCard;

