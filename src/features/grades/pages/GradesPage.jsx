import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

import { GradesGrid, GradeFormDialog } from '../components';
import { useGrade } from '../hooks';

function GradesPage() {
  const { t } = useTranslation();
  const { grades = [], isLoading } = useGrade();

  return (
    <PageLayout title={t('navigation.grades')} description={t('grade.pageDescription')}>
      <GradeFormDialog>
        {({ onEdit }) => <GradesGrid grades={grades} isLoading={isLoading} onEdit={onEdit} />}
      </GradeFormDialog>
    </PageLayout>
  );
}

export default GradesPage;
