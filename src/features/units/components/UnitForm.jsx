// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useUnitForm } from '../hooks';
import UnitFormFields from './UnitFormFields';

const UnitForm = memo(function UnitForm({
  mode = 'dialog',
  open,
  onClose,
  defaultValues = {},
  isEdit = false,
  curriculumId,
  subjectId,
  onSuccess,
}) {
  const { t } = useTranslation();

  const useFormHook = (options) => useUnitForm({ ...options, curriculumId, subjectId, onSuccess });

  return (
    <EntityForm
      mode={mode}
      open={open}
      onClose={onClose}
      defaultValues={defaultValues}
      isEdit={isEdit}
      titleAdd={t('curriculum.addUnit')}
      titleEdit={t('curriculum.editUnit')}
      useFormHook={useFormHook}
      renderFields={() => <UnitFormFields />}
    />
  );
});

UnitForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
  curriculumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSuccess: PropTypes.func,
};

UnitForm.displayName = 'UnitForm';

export default UnitForm;
