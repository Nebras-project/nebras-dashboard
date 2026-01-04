
// internal imports
import { AddIconButton } from '@components';
import { useTranslation } from '@hooks';
import MinisterialFormsGrid from './MinisterialFormsGrid';
import MinisterialFormFormDialog from './MinisterialFormFormDialog';
import MinisterialFormFilter from './MinisterialFormFilter';
import { useMinisterialForm } from '../hooks';

/**
 * FormsTab Component
 *
 * Single Responsibility: Display ministerial forms tab with grid and form dialog
 * Uses dummy data for now
 */
function FormsTab() {
  const { t } = useTranslation();

const { ministerialForms, isLoading } = useMinisterialForm();

  const handleFilterChange = (newFilterParams) => {
    // TODO: When connected to real API, use filterParams to filter forms
    console.log('Filter params:', newFilterParams);
  };

  return (
    <MinisterialFormFormDialog showAddButton={false}>
      {({ onEdit }) => (
        <>
          <MinisterialFormFilter
            onFilterChange={handleFilterChange}
            addButton={
              <AddIconButton onClick={() => onEdit(null)} tooltip={t('ministerialForms.addForm')} />
            }
          />
          <MinisterialFormsGrid forms={ministerialForms} isLoading={isLoading} onEdit={onEdit} />
        </>
      )}
    </MinisterialFormFormDialog>
  );
}

export default FormsTab;
