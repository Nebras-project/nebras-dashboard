// external imports
import { useState } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { AddButton } from '@components';
import { useTranslation, useToast } from '@hooks';
import AdminForm from './AdminForm';

/**
 * AdminFormDialog Component
 *
 * Single Responsibility: Manages the Add button and form dialog state
 */
function AdminFormDialog({ children }) {
  const { t } = useTranslation();
  const { success, error: showError } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const handleAddClick = () => {
    setEditingAdmin(null);
    setFormOpen(true);
  };

  const handleEditClick = (admin) => {
    setEditingAdmin(admin);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingAdmin(null);
  };

  const handleFormSuccess = (data, action) => {
    success({
      title: t(action === 'create' ? 'admins.adminCreated' : 'admins.adminUpdated'),
      content: t(
        action === 'create' ? 'admins.adminCreatedMessage' : 'admins.adminUpdatedMessage',
        {
          name: data.UserName || data.userName || data.name,
        }
      ),
    });
  };

  const handleFormError = (err) => {
    showError({
      title: t('admins.adminOperationFailed'),
      content: err.message || t('admins.operationError'),
    });
  };

  return (
    <>
      <AddButton label={t('admins.addAdmin')} onClick={handleAddClick} />
      {children && typeof children === 'function'
        ? children({ onEdit: handleEditClick })
        : children}
      <AdminForm
        mode="dialog"
        open={formOpen}
        onClose={handleFormClose}
        defaultValues={editingAdmin || {}}
        isEdit={!!editingAdmin}
        onSuccess={handleFormSuccess}
        onError={handleFormError}
      />
    </>
  );
}

AdminFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

AdminFormDialog.displayName = 'AdminFormDialog';

export default AdminFormDialog;
