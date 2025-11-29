// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useExamForm } from '../hooks';
import ExamFormFields from './ExamFormFields';

/**
 * ExamForm Component
 *
 * Single Responsibility: Thin wrapper around generic EntityForm
 * configured for exam entities.
 */
const ExamForm = memo(function ExamForm({
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
      titleAdd={t('competitions.addExam')}
      titleEdit={t('competitions.editExam')}
      useFormHook={useExamForm}
      renderFields={() => <ExamFormFields />}
    />
  );
});

ExamForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
};

ExamForm.displayName = 'ExamForm';

export default ExamForm;
