// external imports
import PropTypes from 'prop-types';

// internal imports
import { EntityFormDialog } from '@components';
import AdminForm from './AdminForm';

/**
 * AdminFormDialog Component
 *
 * Thin wrapper around generic EntityFormDialog configured for admins.
 */
function AdminFormDialog({ showAddButton, children }) {
  return (
    <EntityFormDialog
      addLabelKey="admins.addAdmin"
      FormComponent={AdminForm}
      showAddButton={showAddButton}
    >
      {children}
    </EntityFormDialog>
  );
}

AdminFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showAddButton: PropTypes.bool,
};

AdminFormDialog.displayName = 'AdminFormDialog';

export default AdminFormDialog;
