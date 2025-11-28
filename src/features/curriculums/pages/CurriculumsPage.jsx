import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

import { CurriculumsGrid, CurriculumFormDialog } from '../components';
import { useCurriculum } from '../hooks';

function CurriculumsPage() {
  const { t } = useTranslation();
  const { curriculums = [], isLoading } = useCurriculum();

  return (
    <PageLayout title={t('navigation.curriculums')} description={t('curriculum.pageDescription')}>
      <CurriculumFormDialog>
        {({ onEdit }) => (
          <CurriculumsGrid curriculums={curriculums} isLoading={isLoading} onEdit={onEdit} />
        )}
      </CurriculumFormDialog>
    </PageLayout>
  );
}

export default CurriculumsPage;
