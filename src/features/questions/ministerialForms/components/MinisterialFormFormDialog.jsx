// external imports
import PropTypes from 'prop-types';

// internal imports
import { EntityFormDialog } from '@components';
import MinisterialFormForm from './MinisterialFormForm';

/**
 * MinisterialFormFormDialog Component
 *
 * Thin wrapper around generic EntityFormDialog configured for ministerial forms.
 */
function MinisterialFormFormDialog({ showAddButton = true, children }) {
  return (
    <EntityFormDialog
      addLabelKey="ministerialForms.addForm"
      FormComponent={MinisterialFormForm}
      showAddButton={showAddButton}
    >
      {children}
    </EntityFormDialog>
  );
}

MinisterialFormFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showAddButton: PropTypes.bool,
};

MinisterialFormFormDialog.displayName = 'MinisterialFormFormDialog';

export default MinisterialFormFormDialog;
