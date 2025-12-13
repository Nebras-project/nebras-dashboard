import { useState } from 'react';
import { PageLayout, AddIconButton } from '@components';
import { useTranslation } from '@hooks';

import { StudentsTable, StudentFormDialog, StudentFilter } from '../components';

function StudentsPage() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});

  const handleFilterChange = (newFilterParams) => {
    setFilterParams(newFilterParams);
    // React Query will automatically refetch when params change
  };

  return (
    <PageLayout title={t('students.students')} description={t('students.description')}>
      <StudentFormDialog showAddButton={false}>
        {(renderProps) => (
          <>
            <StudentFilter
              onFilterChange={handleFilterChange}
              addButton={
                <AddIconButton
                  onClick={() => renderProps.onEdit(null)}
                  tooltip={t('students.addStudent')}
                />
              }
            />
            <StudentsTable customFilters={filterParams} onEdit={renderProps.onEdit} />
          </>
        )}
      </StudentFormDialog>
    </PageLayout>
  );
}

export default StudentsPage;
