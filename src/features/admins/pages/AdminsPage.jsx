import { useState, useRef } from 'react';
import { PageLayout, AddIconButton } from '@components';
import { useTranslation } from '@hooks';
import ExportButton from '@components/table/components/ExportButton';

import { AdminsTable, AdminFormDialog, AdminFilter } from '../components';

function AdminsPage() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});
  const tableRef = useRef(null);

  const handleFilterChange = (newFilterParams) => {
    setFilterParams(newFilterParams);
    // React Query will automatically refetch when params change
  };

  return (
    <PageLayout title={t('admins.admins')} description={t('admins.description')}>
      <AdminFormDialog showAddButton={false}>
        {(renderProps) => (
          <>
            <AdminFilter
              onFilterChange={handleFilterChange}
              actions={
                <>
                  <ExportButton
                    tableRef={tableRef}
                    filename="admins"
                    disabled={false}
                    sx={{ mr: 1 }}
                  />
                  <AddIconButton
                    onClick={() => renderProps.onEdit(null)}
                    tooltip={t('admins.addAdmin')}
                  />
                </>
              }
            />
            <AdminsTable
              customFilters={filterParams}
              onEdit={renderProps.onEdit}
              tableRef={tableRef}
            />
          </>
        )}
      </AdminFormDialog>
    </PageLayout>
  );
}

export default AdminsPage;
