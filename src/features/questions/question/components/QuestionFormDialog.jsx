// external imports
import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { AddButton } from '@components';
import { useTranslation } from '@hooks';
import QuestionForm from './QuestionForm';
import QuestionsBatchAdd from '../../questionBatchAdd';

/**
 * QuestionFormDialog Component
 *
 * Thin wrapper around generic EntityFormDialog configured for questions.
 * Supports both single question add/edit and multiple questions add mode.
 */
function QuestionFormDialog({ showAddButton, children }) {
  const { t } = useTranslation();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [multipleQuestionsOpen, setMultipleQuestionsOpen] = useState(false);

  const handleAddClick = useCallback(() => {
    setEditItem(null);
    setMultipleQuestionsOpen(true); // Open multiple questions mode for add
  }, []);

  const handleEditClick = useCallback((item) => {
    if (item === null) {
      // If item is null, open multiple questions mode (for add)
      setMultipleQuestionsOpen(true);
    } else {
      // If item exists, open single form mode (for edit)
      setEditItem(item);
      setEditFormOpen(true);
    }
  }, []);

  const handleEditFormClose = useCallback(() => {
    setEditFormOpen(false);
    setEditItem(null);
  }, []);

  const handleMultipleQuestionsClose = useCallback(() => {
    setMultipleQuestionsOpen(false);
  }, []);

  const handleMultipleQuestionsSuccess = useCallback(() => {
    // TODO: Invalidate queries and show success message
    setMultipleQuestionsOpen(false);
  }, []);

  return (
    <>
      {showAddButton && <AddButton label={t('questions.addQuestion')} onClick={handleAddClick} />}
      {children && typeof children === 'function'
        ? children({ onEdit: handleEditClick })
        : children}
      <QuestionForm
        mode="dialog"
        open={editFormOpen}
        onClose={handleEditFormClose}
        defaultValues={editItem || {}}
        isEdit={!!editItem}
      />
      <QuestionsBatchAdd
        open={multipleQuestionsOpen}
        onClose={handleMultipleQuestionsClose}
        onSuccess={handleMultipleQuestionsSuccess}
      />
    </>
  );
}

QuestionFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showAddButton: PropTypes.bool,
};

QuestionFormDialog.displayName = 'QuestionFormDialog';

export default QuestionFormDialog;
