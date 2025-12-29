// external imports
import { useParams } from 'react-router-dom';

// internal imports
import { PageLayout, Loader } from '@components';
import { useTranslation } from '@hooks';
import { useGrade } from '../hooks';
import { getGradeName } from '../utils';
import { GradeDetails, GradeErrorState } from '../components';

/**
 * GradePage Component
 *
 * Single Responsibility: Handle grade page routing, loading states, and error states
 */
function GradePage() {
  const { gradeId } = useParams();
  const { t } = useTranslation();
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

  const gradeName = getGradeName(grade);

  return (
    <PageLayout title={t('grade.viewGrade')} description={gradeName} >
      <GradeDetails gradeId={gradeId} />
    </PageLayout>
  );
}

export default GradePage;
