// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { UserFields, EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useStudentForm } from '../hooks';

/**
 * StudentForm Component
 *
 * Single Responsibility: Thin wrapper around generic EntityForm
 * configured for students.
 */
const StudentForm = memo(function StudentForm({
  mode = 'dialog',
  open,
  onClose,
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
}) {
  const { t } = useTranslation();

  return (
    <EntityForm
      mode={mode}
      open={open}
      onClose={onClose}
      defaultValues={defaultValues}
      isEdit={isEdit}
      onSuccess={onSuccess}
      onError={onError}
      titleAdd={t('students.addStudent')}
      titleEdit={t('students.editStudent')}
      useFormHook={useStudentForm}
      renderFields={({ classOptions }) => (
        <UserFields
          showPassword
          showClass
          showProfileImage
          classOptions={classOptions}
          phoneRequired={false}
        />
      )}
    />
  );
});

StudentForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

StudentForm.displayName = 'StudentForm';

export default StudentForm;
