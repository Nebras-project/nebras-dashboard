// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useMinisterialFormForm } from '../hooks';
import MinisterialFormFormFields from './MinisterialFormFormFields';

/**
 * MinisterialFormForm Component
 *
 * Single Responsibility: Thin wrapper around generic EntityForm
 * configured for ministerial form entities.
 */
const MinisterialFormForm = memo(function MinisterialFormForm({
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
      titleAdd={t('ministerialForms.addForm')}
      titleEdit={t('ministerialForms.editForm')}
      useFormHook={useMinisterialFormForm}
      renderFields={() => <MinisterialFormFormFields />}
    />
  );
});

MinisterialFormForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
};

MinisterialFormForm.displayName = 'MinisterialFormForm';

export default MinisterialFormForm;
