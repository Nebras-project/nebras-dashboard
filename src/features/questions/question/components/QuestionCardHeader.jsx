import PropTypes from 'prop-types';
import { Box, Stack, Typography, Chip } from '@mui/material';
import { useTranslation } from '@hooks';
import { margin } from '@constants';
import QuestionCardActions from './QuestionCardActions';
/**
 * QuestionCardHeader Component
 *
 * Single Responsibility: Render question card header with number, type, category, and actions
 */
function QuestionCardHeader({ question, questionNumber, onEdit, onDelete }) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        ...margin.bottom.md,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <Typography variant="h4">
          {t('questions.questionNumber', { number: questionNumber })}
        </Typography>
        {question.type && (
          <Chip
            label={t(`questions.types.${question.type}`)}
            size="small"
            color="info"
            variant="filled"
          />
        )}
        {question.category && (
          <Chip
            label={t(`questions.categories.${question.category}`)}
            size="small"
            color="warning"
            variant="filled"
          />
        )}
      </Stack>

      <Box onClick={(e) => e.stopPropagation()}>
        <QuestionCardActions question={question} onEdit={onEdit} onDelete={onDelete} />
      </Box>
    </Box>
  );
}

QuestionCardHeader.propTypes = {
  question: PropTypes.object.isRequired,
  questionNumber: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default QuestionCardHeader;
