// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { EntityForm } from '@components';
import { useTranslation } from '@hooks';
import { useCompetitionForm } from '../hooks';
import CompetitionFormFields from './CompetitionFormFields';

/**
 * CompetitionForm Component
 *
 * Single Responsibility: Thin wrapper around generic EntityForm
 * configured for competition entities.
 */
const CompetitionForm = memo(function CompetitionForm({
  mode = 'dialog',
  open,
  onClose,
  defaultValues = {},
  isEdit = false,
}) {
  const { t } = useTranslation();

  return (
    <EntityForm
      mode={mode}
      open={open}
      onClose={onClose}
      defaultValues={defaultValues}
      isEdit={isEdit}
      titleAdd={t('competitions.addCompetition')}
      titleEdit={t('competitions.editCompetition')}
      useFormHook={useCompetitionForm}
      renderFields={() => <CompetitionFormFields />}
    />
  );
});

CompetitionForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
};

CompetitionForm.displayName = 'CompetitionForm';

export default CompetitionForm;
