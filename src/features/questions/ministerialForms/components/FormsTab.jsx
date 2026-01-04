// external imports
import { useState, useMemo } from 'react';

// internal imports
import { AddIconButton } from '@components';
import { useTranslation } from '@hooks';
import { filterParamsToQueryString } from '@utils';
import MinisterialFormsGrid from './MinisterialFormsGrid';
import MinisterialFormFormDialog from './MinisterialFormFormDialog';
import MinisterialFormFilter from './MinisterialFormFilter';
import { useMinisterialForm } from '../hooks';

/**
 * FormsTab Component
 *
 * Single Responsibility: Display ministerial forms tab with grid and form dialog
 */
function FormsTab() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});

  // Convert filter params object to query string
  const queryString = useMemo(() => filterParamsToQueryString(filterParams), [filterParams]);

  const { ministerialForms, isLoading } = useMinisterialForm({
    queryString
  });

  const handleFilterChange = (newFilterParams) => {
    setFilterParams(newFilterParams || {});
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
