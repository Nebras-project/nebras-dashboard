// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useSubjectForm } from '../hooks';
import SubjectFormFields from './SubjectFormFields';

/**
 * SubjectForm Component
 *
 * Single Responsibility: Thin wrapper around generic EntityForm
 * configured for subject entities.
 */
const SubjectForm = memo(function SubjectForm({
  mode = 'dialog',
  open,
  onClose,
  defaultValues = {},
  isEdit = false,
  curriculumId,
  onSuccess,
}) {
  const { t } = useTranslation();

  // Create a wrapper hook that includes curriculumId
  const useFormHook = (options) => useSubjectForm({ ...options, curriculumId, onSuccess });

  return (
    <EntityForm
      mode={mode}
      open={open}
      onClose={onClose}
      defaultValues={defaultValues}
      isEdit={isEdit}
      titleAdd={t('curriculum.addSubject')}
      titleEdit={t('curriculum.editSubject')}
      useFormHook={useFormHook}
      renderFields={() => <SubjectFormFields />}
    />
  );
});

SubjectForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
  curriculumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSuccess: PropTypes.func,
};

SubjectForm.displayName = 'SubjectForm';

export default SubjectForm;
