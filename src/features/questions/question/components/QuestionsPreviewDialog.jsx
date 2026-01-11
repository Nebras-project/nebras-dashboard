// external imports
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { useTranslation } from '@hooks';
import { Icon } from '@components';
import QuestionCard from './QuestionCard';
import { QUESTION_DIALOG_WIDTH } from '../constants';
import { EmptyState } from '@components';
import { margin, padding } from '@constants';

/**
 * QuestionsPreviewDialog Component
 *
 * Single Responsibility: Display saved questions in a dialog
 */
function QuestionsPreviewDialog({
  open,
  onClose,
  questions,
  onEdit,
  onDelete,
  onSaveAll,
  onClearAll,
}) {
  const { t } = useTranslation();

  const handleEdit = (question) => {
    onEdit(question);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: QUESTION_DIALOG_WIDTH } } }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon name="thListOutline" size={24} />
          <Typography variant="h6" component="span">
            {t('questions.viewAllQuestions')}
          </Typography>
          {questions.length > 0 && onClearAll && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={onClearAll}
              sx={{ ml: 'auto' }}
            >
              {t('questions.deleteAllQuestions')}
            </Button>
          )}
        </Box>
      </DialogTitle>

      <DialogContent>
        {questions.length === 0 ? (
          <EmptyState icon="questionAnswer" title={t('questions.noQuestionsSaved')} />
        ) : (
          <Stack spacing={3} sx={{ ...margin.y.md }}>
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                questionNumber={index + 1}
                onEdit={handleEdit}
                onDelete={onDelete}
              />
            ))}
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ ...padding.all.lg }}>
        <Button onClick={onClose}>{t('common.close')}</Button>
        {questions.length > 0 && onSaveAll && (
          <Button variant="outlined" color="primary" onClick={onSaveAll}>
            {t('questions.addAllQuestions')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

QuestionsPreviewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      question: PropTypes.string,
      type: PropTypes.string,
      class: PropTypes.string,
      correctAnswer: PropTypes.string,
      choiceA: PropTypes.string,
      choiceB: PropTypes.string,
      choiceC: PropTypes.string,
      choiceD: PropTypes.string,
      questionImage: PropTypes.string,
      curriculumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      unitId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      lessonId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      formNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSaveAll: PropTypes.func,
  onClearAll: PropTypes.func,
};

QuestionsPreviewDialog.displayName = 'QuestionsPreviewDialog';

export default QuestionsPreviewDialog;
