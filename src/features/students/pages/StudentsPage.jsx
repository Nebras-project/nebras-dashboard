import { PageLayout } from '@components';
import { useTranslation } from '@hooks';
import { AddButton } from '@components';

import { StudentsTable } from '../components';

function StudentsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('students.students')} description={t('students.description')}>
      <AddButton label={t('students.addStudent')} onClick={() => console.log('Add student')} />
      <StudentsTable />
    </PageLayout>
  );
}

export default StudentsPage;
