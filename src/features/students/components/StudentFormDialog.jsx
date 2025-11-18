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
function StudentFormDialog({ children }) {
  return (
    <EntityFormDialog
      addLabelKey="students.addStudent"
      FormComponent={StudentForm}
    >
      {children}
    </EntityFormDialog>
  );
}

StudentFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

StudentFormDialog.displayName = 'StudentFormDialog';

export default StudentFormDialog;
