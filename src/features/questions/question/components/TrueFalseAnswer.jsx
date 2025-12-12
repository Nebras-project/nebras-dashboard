import PropTypes from 'prop-types';
import { Typography, Chip } from '@mui/material';
import { useTranslation } from '@hooks';
import QuestionCardDetailItem from './QuestionCardDetailItem';
import { getCorrectAnswerLabel } from '../../utils';

/**
 * TrueFalseAnswer Component
 *
 * Single Responsibility: Render True/False question correct answer
 */
function TrueFalseAnswer({ question }) {
  const { t } = useTranslation();

  return (
    <QuestionCardDetailItem iconName="checkCircle">
      <Typography variant="body2" component="span" fontWeight={600} sx={{ mr: 1 }}>
        {t('questions.correctAnswer')}:
      </Typography>
      <Chip
        label={getCorrectAnswerLabel(question, t)}
        size="small"
        color="success"
        variant="filled"
      />
    </QuestionCardDetailItem>
  );
}

TrueFalseAnswer.propTypes = {
  question: PropTypes.shape({
    Type: PropTypes.string.isRequired,
    CorrectAnswer: PropTypes.string.isRequired,
  }).isRequired,
};

export default TrueFalseAnswer;
