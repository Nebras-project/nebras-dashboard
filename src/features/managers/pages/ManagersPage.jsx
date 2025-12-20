import { useState } from 'react';
import { PageLayout, AddIconButton } from '@components';
import { useTranslation } from '@hooks';

import { ManagersTable, ManagerFormDialog, ManagerFilter } from '../components';

function ManagersPage() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});

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
              addButton={
                <AddIconButton
                  onClick={() => renderProps.onEdit(null)}
                  tooltip={t('managers.addManager')}
                />
              }
            />
            <ManagersTable customFilters={filterParams} onEdit={renderProps.onEdit} />
          </>
        )}
      </ManagerFormDialog>
    </PageLayout>
  );
}

export default ManagersPage;
