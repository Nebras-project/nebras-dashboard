// external imports
import PropTypes from 'prop-types';

// internal imports
import { EntityFormDialog } from '@components';
import GradeForm from './GradeForm';

/**
 * GradeFormDialog Component
 *
 * Thin wrapper around generic EntityFormDialog configured for grades.
 */
function GradeFormDialog({ showAddButton, children }) {
  return (
    <EntityFormDialog
      addLabelKey="grade.addGrade"
      FormComponent={GradeForm}
      showAddButton={showAddButton}
    >
      {children}
    </EntityFormDialog>
  );
}

GradeFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showAddButton: PropTypes.bool,
};

GradeFormDialog.displayName = 'GradeFormDialog';

export default GradeFormDialog;
