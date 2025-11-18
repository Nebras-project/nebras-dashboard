// external imports
import PropTypes from 'prop-types';

// internal imports
import { EntityFormDialog } from '@components';
import StudentForm from './StudentForm';

/**
 * StudentFormDialog Component
 *
 * Thin wrapper around generic EntityFormDialog configured for students.
 */
function StudentFormDialog({ showAddButton, children }) {
  return (
    <EntityFormDialog
      addLabelKey="students.addStudent"
      FormComponent={StudentForm}
      showAddButton={showAddButton}
    >
      {children}
    </EntityFormDialog>
  );
}

StudentFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showAddButton: PropTypes.bool,
};

StudentFormDialog.displayName = 'StudentFormDialog';

export default StudentFormDialog;
