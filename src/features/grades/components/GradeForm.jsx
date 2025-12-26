// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useGradeForm } from '../hooks';
import GradeFormFields from './GradeFormFields';

/**
 * GradeForm Component
 *
 * Single Responsibility: Thin wrapper around generic EntityForm
 * configured for grade entities.
 */
const GradeForm = memo(function GradeForm({
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
      titleAdd={t('grade.addGrade')}
      titleEdit={t('grade.editGrade')}
      useFormHook={useGradeForm}
      renderFields={() => <GradeFormFields />}
    />
  );
});

GradeForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
};

GradeForm.displayName = 'GradeForm';

export default GradeForm;
