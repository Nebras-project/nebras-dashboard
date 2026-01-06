import { useState, useRef } from 'react';
import { PageLayout, AddIconButton } from '@components';
import { useTranslation } from '@hooks';
import ExportButton from '@components/table/components/ExportButton';

import { ManagersTable, ManagerFormDialog, ManagerFilter } from '../components';

function ManagersPage() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});
  const tableRef = useRef(null);

  const handleFilterChange = (newFilterParams) => {
    setFilterParams(newFilterParams);
    // React Query will automatically refetch when params change
  };

  return (
    <PageLayout title={t('managers.managers')} description={t('managers.description')}>
      <ManagerFormDialog showAddButton={false}>
        {(renderProps) => (
          <>
            <ManagerFilter
              onFilterChange={handleFilterChange}
              actions={
                <>
                  <ExportButton
                    tableRef={tableRef}
                    filename="managers"
                    disabled={false}
                    sx={{ mr: 1 }}
                  />
                  <AddIconButton
                    onClick={() => renderProps.onEdit(null)}
                    tooltip={t('managers.addManager')}
                  />
                </>
              }
            />
            <ManagersTable
              customFilters={filterParams}
              onEdit={renderProps.onEdit}
              tableRef={tableRef}
            />
          </>
        )}
      </ManagerFormDialog>
    </PageLayout>
  );
}

export default ManagersPage;
