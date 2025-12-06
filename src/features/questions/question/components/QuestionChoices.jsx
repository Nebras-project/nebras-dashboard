import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import QuestionChoiceItem from './QuestionChoiceItem';

/**
 * QuestionChoices Component
 *
 * Single Responsibility: Render all question choices in a grid layout (2 rows, 2 choices per row)
 */
function QuestionChoices({ question }) {
  const choices = [
    { key: 'choiceA', value: question.choiceA },
    { key: 'choiceB', value: question.choiceB },
    { key: 'choiceC', value: question.choiceC },
    { key: 'choiceD', value: question.choiceD },
  ];

  return (
    <Grid container spacing={2}>
      {choices.map((choice) => (
        <Grid key={choice.key} size={{ mobile: 12, desktop: 6 }}>
          <QuestionChoiceItem
            choiceKey={choice.key}
            choiceValue={choice.value}
            isCorrect={question.correctAnswer === choice.key}
          />
        </Grid>
      ))}
    </Grid>
  );
}

QuestionChoices.propTypes = {
  question: PropTypes.shape({
    choiceA: PropTypes.string,
    choiceB: PropTypes.string,
    choiceC: PropTypes.string,
    choiceD: PropTypes.string,
    correctAnswer: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionChoices;
