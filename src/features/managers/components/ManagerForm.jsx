// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { UserFields, EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useManagerForm } from '../hooks';

/**
 * ManagerForm Component
 *
 * Single Responsibility: Thin wrapper around generic EntityForm
 * configured for manager users.
 */
const ManagerForm = memo(function ManagerForm({
  mode = 'dialog',
  open,
  onClose,
  defaultValues = {},
  isEdit = false,
  titleEdit,
}) {
  const { t } = useTranslation();

  return (
    <EntityForm
      mode={mode}
      open={open}
      onClose={onClose}
      defaultValues={defaultValues}
      isEdit={isEdit}
      titleAdd={t('managers.addManager')}
      titleEdit={titleEdit || t('managers.editManager')}
      useFormHook={useManagerForm}
      renderFields={({ roleOptions, isEdit }) => (
        <UserFields
          showPassword
          showRole
          showProfileImage
          roleOptions={roleOptions}
          passwordRequired={!isEdit}
        />
      )}
    />
  );
});

ManagerForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
  titleEdit: PropTypes.string,
};

ManagerForm.displayName = 'ManagerForm';

export default ManagerForm;
