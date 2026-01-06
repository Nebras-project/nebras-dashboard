// external imports
import { useState, useRef } from 'react';

// internal imports
import { AddIconButton } from '@components';
import { useTranslation } from '@hooks';
import ExportButton from '@components/table/components/ExportButton';
import MinisterialFormsTable from './MinisterialFormsTable';
import MinisterialFormFormDialog from './MinisterialFormFormDialog';
import MinisterialFormFilter from './MinisterialFormFilter';

/**
 * FormsTab Component
 *
 * Single Responsibility: Display ministerial forms tab with table and form dialog
 */
function FormsTab() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});
  const tableRef = useRef(null);

  const handleFilterChange = (newFilterParams) => {
    setFilterParams(newFilterParams || {});
  };

  return (
    <MinisterialFormFormDialog showAddButton={false}>
      {({ onEdit }) => (
        <>
          <MinisterialFormFilter
            onFilterChange={handleFilterChange}
            actions={
              <>
                <ExportButton tableRef={tableRef} filename="ministerial-forms" disabled={false} />
                <AddIconButton
                  onClick={() => onEdit(null)}
                  tooltip={t('ministerialForms.addForm')}
                />
              </>
            }
          />
          <MinisterialFormsTable customFilters={filterParams} onEdit={onEdit} tableRef={tableRef} />
        </>
      )}
    </MinisterialFormFormDialog>
  );
}

export default FormsTab;
