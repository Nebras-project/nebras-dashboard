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
  // Handle array format from backend
  const choices =
    question.choices && Array.isArray(question.choices)
      ? question.choices.map((value, index) => ({
          key: CHOICE_KEYS[index],
          value: value,
        }))
      : [];

  const correctAnswer = question.correctAnswer;

  return (
    <Grid container spacing={2}>
      {choices.map((choice) => (
        <Grid key={choice.key} size={{ mobile: 12, desktop: 6 }}>
          <QuestionChoiceItem
            choiceKey={choice.key}
            choiceValue={choice.value}
            isCorrect={correctAnswer === choice.key}
          />
        </Grid>
      ))}
    </Grid>
  );
}

QuestionChoices.propTypes = {
  question: PropTypes.shape({
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionChoices;
