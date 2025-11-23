// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useCurriculumForm } from '../hooks';
import CurriculumFormFields from './CurriculumFormFields';

/**
 * CurriculumForm Component
 *
 * Single Responsibility: Thin wrapper around generic EntityForm
 * configured for curriculum entities.
 */
const CurriculumForm = memo(function CurriculumForm({
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
      titleAdd={t('curriculum.addCurriculum')}
      titleEdit={t('curriculum.editCurriculum')}
      useFormHook={useCurriculumForm}
      renderFields={() => <CurriculumFormFields />}
    />
  );
});

CurriculumForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
};

CurriculumForm.displayName = 'CurriculumForm';

export default CurriculumForm;
