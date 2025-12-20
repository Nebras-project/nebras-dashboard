// external imports
import PropTypes from 'prop-types';

// internal imports
import { EntityFormDialog } from '@components';
import ManagerForm from './ManagerForm';

/**
 * ManagerFormDialog Component
 *
 * Thin wrapper around generic EntityFormDialog configured for managers.
 */
function ManagerFormDialog({ showAddButton, children }) {
  return (
    <EntityFormDialog
      addLabelKey="managers.addManager"
      FormComponent={ManagerForm}
      showAddButton={showAddButton}
    >
      {children}
    </EntityFormDialog>
  );
}

ManagerFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showAddButton: PropTypes.bool,
};

ManagerFormDialog.displayName = 'ManagerFormDialog';

export default ManagerFormDialog;
