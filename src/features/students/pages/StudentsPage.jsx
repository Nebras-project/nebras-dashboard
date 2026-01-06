import { useState, useRef } from 'react';
import { PageLayout, AddIconButton } from '@components';
import { useTranslation } from '@hooks';
import ExportButton from '@components/table/components/ExportButton';

import { StudentsTable, StudentFormDialog, StudentFilter } from '../components';

function StudentsPage() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});
  const tableRef = useRef(null);

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
              actions={
                <>
                  <ExportButton
                    tableRef={tableRef}
                    filename="students"
                    disabled={false}
                    sx={{ mr: 1 }}
                  />
                  <AddIconButton
                    onClick={() => renderProps.onEdit(null)}
                    tooltip={t('students.addStudent')}
                  />
                </>
              }
            />
            <StudentsTable
              customFilters={filterParams}
              onEdit={renderProps.onEdit}
              tableRef={tableRef}
            />
          </>
        )}
      </StudentFormDialog>
    </PageLayout>
  );
}

export default StudentsPage;
