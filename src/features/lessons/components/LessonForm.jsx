// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useLessonForm } from '../hooks';
import LessonFormFields from './LessonFormFields';

const LessonForm = memo(function LessonForm({
  mode = 'dialog',
  open,
  onClose,
  defaultValues = {},
  isEdit = false,
  gradeId,
  subjectId,
  unitId,
  onSuccess,
}) {
  const { t } = useTranslation();

  const useFormHook = (options) =>
    useLessonForm({ ...options, gradeId, subjectId, unitId, onSuccess });

  return (
    <EntityForm
      mode={mode}
      open={open}
      onClose={onClose}
      defaultValues={defaultValues}
      isEdit={isEdit}
      titleAdd={t('grade.addLesson')}
      titleEdit={t('grade.editLesson')}
      useFormHook={useFormHook}
      renderFields={() => <LessonFormFields />}
    />
  );
});

LessonForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
  gradeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unitId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSuccess: PropTypes.func,
};

LessonForm.displayName = 'LessonForm';

export default LessonForm;
