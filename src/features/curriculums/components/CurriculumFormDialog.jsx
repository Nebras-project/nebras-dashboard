// external imports
import PropTypes from 'prop-types';

// internal imports
import { EntityFormDialog } from '@components';
import CurriculumForm from './CurriculumForm';

/**
 * CurriculumFormDialog Component
 *
 * Thin wrapper around generic EntityFormDialog configured for curriculums.
 */
function CurriculumFormDialog({ showAddButton, children }) {
  return (
    <EntityFormDialog
      addLabelKey="curriculum.addCurriculum"
      FormComponent={CurriculumForm}
      showAddButton={showAddButton}
    >
      {children}
    </EntityFormDialog>
  );
}

CurriculumFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showAddButton: PropTypes.bool,
};

CurriculumFormDialog.displayName = 'CurriculumFormDialog';

export default CurriculumFormDialog;
