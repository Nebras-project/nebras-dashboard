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
      titleAdd={t('admins.addAdmin')}
      titleEdit={titleEdit || t('admins.editAdmin')}
      useFormHook={useAdminForm}
      renderFields={({ isEdit }) => (
        <UserFields showPassword showRole={false} passwordRequired={!isEdit} isEdit={isEdit} />
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
  titleEdit: PropTypes.string,
};

AdminForm.displayName = 'AdminForm';

export default AdminForm;
