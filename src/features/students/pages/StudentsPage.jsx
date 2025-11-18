import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

import { StudentsTable, StudentFormDialog } from '../components';

function StudentsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('students.students')} description={t('students.description')}>
      <StudentFormDialog>{({ onEdit }) => <StudentsTable onEdit={onEdit} />}</StudentFormDialog>
    </PageLayout>
  );
}

export default StudentsPage;
