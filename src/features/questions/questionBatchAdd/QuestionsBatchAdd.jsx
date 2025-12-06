import PropTypes from 'prop-types';
import { useTranslation } from '@hooks';
import { ConfirmDialog } from '@components';
import QuestionsPreviewDialog from '../question/components/QuestionsPreviewDialog';
import { useBatchAddLogic } from './hooks/useBatchAddLogic';
import QuestionsBatchAddDialog from './components/QuestionsBatchAddDialog';

/**
 * QuestionsBatchAdd Component
 *
 * Single Responsibility: Render UI for batch adding questions (presentation only)
 */
function QuestionsBatchAdd({ open, onClose, onSuccess }) {
  const { t } = useTranslation();

  const {
    savedQuestions,
    previewOpen,
    confirmOpen,
    confirmCallback,
    totalQuestionsCount,
    currentForm,
    formContextValue,
    handleClose,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveAll,
    clearAll,
    setPreviewOpen,
    closeConfirm,
  } = useBatchAddLogic({
    open,
    onClose,
    onSuccess,
  });

  return (
    <>
      <QuestionsBatchAddDialog
        open={open}
        onClose={handleClose}
        onAddQuestion={handleAddQuestion}
        onViewAll={() => setPreviewOpen(true)}
        onSaveAll={() => handleSaveAll(false)}
        savedQuestionsCount={savedQuestions.length}
        totalQuestionsCount={totalQuestionsCount}
        currentForm={currentForm}
        formContextValue={formContextValue}
      />

      <QuestionsPreviewDialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        questions={savedQuestions}
        onEdit={handleEditQuestion}
        onDelete={handleDeleteQuestion}
        onSaveAll={() => handleSaveAll(true)}
        onClearAll={clearAll}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={closeConfirm}
        onConfirm={confirmCallback || (() => {})}
        title={t('questions.confirmEditTitle')}
        message={t('questions.confirmEditMessage')}
        confirmText={t('common.confirm')}
        cancelText={t('common.cancel')}
        confirmColor="primary"
      />
    </>
  );
}

QuestionsBatchAdd.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

QuestionsBatchAdd.displayName = 'QuestionsBatchAdd';

export default QuestionsBatchAdd;
