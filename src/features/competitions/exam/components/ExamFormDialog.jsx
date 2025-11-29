// external imports
import PropTypes from 'prop-types';

// internal imports
import { EntityFormDialog } from '@components';
import ExamForm from './ExamForm';

/**
 * ExamFormDialog Component
 *
 * Thin wrapper around generic EntityFormDialog configured for exams.
 */
function ExamFormDialog({ showAddButton, children }) {
  return (
    <EntityFormDialog
      addLabelKey="competitions.addExam"
      FormComponent={ExamForm}
      showAddButton={showAddButton}
    >
      {children}
    </EntityFormDialog>
  );
}

ExamFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showAddButton: PropTypes.bool,
};

ExamFormDialog.displayName = 'ExamFormDialog';

export default ExamFormDialog;
