import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import QuestionChoiceItem from './QuestionChoiceItem';
import { CHOICE_KEYS } from '../constants';

/**
 * QuestionChoices Component
 *
 * Single Responsibility: Render all question choices in a grid layout (2 rows, 2 choices per row)
 */
function QuestionChoices({ question }) {
  // Handle array format from backend (new format: {label, text, isCorrect})
  const choices =
    question.choices && Array.isArray(question.choices)
      ? question.choices.map((item, index) => ({
          key: CHOICE_KEYS[index],
          text: item?.text || '',
          isCorrect: !!item?.isCorrect,
        }))
      : [];

  const correctAnswer = question.correctAnswer;

  return (
    <Grid container spacing={2}>
      {choices.map((choice) => (
        <Grid key={choice.key} size={{ mobile: 12, desktop: 6 }}>
          <QuestionChoiceItem
            choiceKey={choice.key}
            choiceValue={choice.text}
            isCorrect={choice.isCorrect || correctAnswer === choice.key}
          />
        </Grid>
      ))}
    </Grid>
  );
}

QuestionChoices.propTypes = {
  question: PropTypes.shape({
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        text: PropTypes.string,
        isCorrect: PropTypes.bool,
      })
    ).isRequired,
    correctAnswer: PropTypes.string,
  }).isRequired,
};

export default QuestionChoices;
