// external imports
import { useParams } from 'react-router-dom';

// internal imports
import { PageLayout, Loader } from '@components';
import { useTranslation, useLanguage } from '@hooks';
import { useGrade } from '../hooks';
import { getGradeName } from '../utils';
import { GradeDetails, GradeErrorState } from '../components';

/**
 * GradePage Component
 *
 * Single Responsibility: Handle grade page routing, loading states, and error states
 */
function GradePage() {
  const { gradeId: id } = useParams();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const gradeId = parseInt(id, 10);
  const { grade, isLoading, isError } = useGrade({ id: gradeId });

  if (isLoading) {
    return (
      <PageLayout title={t('grade.gradeDetails')}>
        <Loader />
      </PageLayout>
    );
  }

  if (isError || !grade) {
    return (
      <PageLayout title={t('grade.gradeDetails')}>
        <GradeErrorState />
      </PageLayout>
    );
  }

  const gradeName = getGradeName(grade, currentLanguage);

  return (
    <PageLayout title={t('grade.viewGrade')} description={gradeName} showBackButton>
      <GradeDetails gradeId={gradeId} />
    </PageLayout>
  );
}

export default GradePage;
