import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from '@hooks';
import { FormProvider } from '@components/forms/components';
import { QuestionFormFields } from '../../QuestionFormFields/components';
import QuestionsBatchAddToolbar from './QuestionsBatchAddToolbar';
import { QUESTION_DIALOG_WIDTH } from '../../question/constants';
import { padding } from '@constants';
import { CloseButton } from '@components';

/**
 * QuestionsBatchAddDialog Component
 *
 * Single Responsibility: Render dialog UI for batch adding questions
 */
function QuestionsBatchAddDialog({
  open,
  onClose,
  onAddQuestion,
  onViewAll,
  onSaveAll,
  savedQuestionsCount,
  totalQuestionsCount,
  currentForm,
  formContextValue,
}) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      // onClose={onClose}
      slotProps={{ paper: { sx: { width: QUESTION_DIALOG_WIDTH } } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5"> {t('questions.addQuestions')}</Typography>
        <CloseButton onClick={onClose} size="medium" iconName="closeAlt" showTooltip />
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <QuestionsBatchAddToolbar
            onAddQuestion={onAddQuestion}
            onViewAll={onViewAll}
            savedQuestionsCount={savedQuestionsCount}
          />

          <FormProvider methods={currentForm} contextValue={formContextValue}>
            <QuestionFormFields />
          </FormProvider>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ ...padding.x.lg, ...padding.bottom.lg }}>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <Button variant="outlined" onClick={onSaveAll} disabled={totalQuestionsCount === 0}>
          {t('questions.addAllQuestions')} ({totalQuestionsCount})
        </Button>
      </DialogActions>
    </Dialog>
  );
}

QuestionsBatchAddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddQuestion: PropTypes.func.isRequired,
  onViewAll: PropTypes.func.isRequired,
  onSaveAll: PropTypes.func.isRequired,
  savedQuestionsCount: PropTypes.number.isRequired,
  totalQuestionsCount: PropTypes.number.isRequired,
  currentForm: PropTypes.object.isRequired,
  formContextValue: PropTypes.object.isRequired,
};

export default QuestionsBatchAddDialog;
