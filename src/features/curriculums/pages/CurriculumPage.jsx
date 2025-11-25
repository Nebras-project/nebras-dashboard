// external imports
import { useParams } from 'react-router-dom';

// internal imports
import { PageLayout, Loader } from '@components';
import { useTranslation, useLanguage } from '@hooks';
import { useCurriculum } from '../hooks';
import { getCurriculumName } from '../utils';
import { CurriculumDetails, CurriculumErrorState } from '../components';

/**
 * CurriculumPage Component
 *
 * Single Responsibility: Handle curriculum page routing, loading states, and error states
 */
function CurriculumPage() {
  const { curriculumId: id } = useParams();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const curriculumId = parseInt(id, 10);
  const { curriculum, isLoading, isError } = useCurriculum({ id: curriculumId });

  if (isLoading) {
    return (
      <PageLayout title={t('curriculum.curriculumDetails')}>
        <Loader />
      </PageLayout>
    );
  }

  if (isError || !curriculum) {
    return (
      <PageLayout title={t('curriculum.curriculumDetails')}>
        <CurriculumErrorState />
      </PageLayout>
    );
  }

  const curriculumName = getCurriculumName(curriculum, currentLanguage);

  return (
    <PageLayout title={t('curriculum.viewCurriculum')} description={curriculumName} showBackButton>
      <CurriculumDetails curriculumId={curriculumId} />
    </PageLayout>
  );
}

export default CurriculumPage;
