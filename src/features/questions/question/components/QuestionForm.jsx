// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useQuestionForm } from '../hooks';
import { QuestionFormFields } from '../../formFields/components';

/**
 * QuestionForm Component
 *
 * Single Responsibility: Thin wrapper around generic EntityForm
 * configured for question entities.
 */
const QuestionForm = memo(function QuestionForm({
  mode = 'dialog',
  open,
  onClose,
  defaultValues = {},
  isEdit = false,
}) {
  const { t } = useTranslation();

  return (
    <EntityForm
      mode={mode}
      open={open}
      onClose={onClose}
      defaultValues={defaultValues}
      isEdit={isEdit}
      titleAdd={t('questions.addQuestion')}
      titleEdit={t('questions.editQuestion')}
      useFormHook={useQuestionForm}
      renderFields={() => <QuestionFormFields />}
    />
  );
});

QuestionForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
};

QuestionForm.displayName = 'QuestionForm';

export default QuestionForm;
