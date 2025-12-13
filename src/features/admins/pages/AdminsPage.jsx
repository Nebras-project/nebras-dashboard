import { useState } from 'react';
import { PageLayout, AddIconButton } from '@components';
import { useTranslation } from '@hooks';

import { AdminsTable, AdminFormDialog, AdminFilter } from '../components';

function AdminsPage() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});

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
              addButton={
                <AddIconButton
                  onClick={() => renderProps.onEdit(null)}
                  tooltip={t('admins.addAdmin')}
                />
              }
            />
            <AdminsTable customFilters={filterParams} onEdit={renderProps.onEdit} />
          </>
        )}
      </AdminFormDialog>
    </PageLayout>
  );
}

export default AdminsPage;
