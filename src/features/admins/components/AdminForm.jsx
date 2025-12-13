// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { UserFields, EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useAdminForm } from '../hooks';

/**
 * AdminForm Component
 *
 * Single Responsibility: Thin wrapper around generic EntityForm
 * configured for admin users.
 */
const AdminForm = memo(function AdminForm({
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
      titleAdd={t('admins.addAdmin')}
      titleEdit={t('admins.editAdmin')}
      useFormHook={useAdminForm}
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

AdminForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
};

AdminForm.displayName = 'AdminForm';

export default AdminForm;
