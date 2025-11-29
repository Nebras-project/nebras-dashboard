// external imports
import PropTypes from 'prop-types';

// internal imports
import { EntityFormDialog } from '@components';
import CompetitionForm from './CompetitionForm';

/**
 * CompetitionFormDialog Component
 *
 * Thin wrapper around generic EntityFormDialog configured for competitions.
 */
function CompetitionFormDialog({ showAddButton, children }) {
  return (
    <EntityFormDialog
      addLabelKey="competitions.addCompetition"
      FormComponent={CompetitionForm}
      showAddButton={showAddButton}
    >
      {children}
    </EntityFormDialog>
  );
}

CompetitionFormDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showAddButton: PropTypes.bool,
};

CompetitionFormDialog.displayName = 'CompetitionFormDialog';

export default CompetitionFormDialog;
