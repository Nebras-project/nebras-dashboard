import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout, Loader, EmptyState } from '@components';
import { useTranslation, useLanguage } from '@hooks';
import { getCompetitionName } from '../utils';
import { CompetitionInfo } from '../components';
import { mockExams, ExamsGrid, ExamFormDialog } from '../../exam';
import { mockCompetitions } from '../data/mockCompetitions';

function CompetitionPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const competitionId = id ? Number(id) : null;

  // // Fetch competition data
  // const { competition, isLoading: isLoadingCompetition } = useCompetition({
  //   id: competitionId,
  //   enabled: !!competitionId,
  // });

  // // Fetch exams data
  // const { exams = mockExamsForCompetition, isLoading: isLoadingExams } = useExam({
  //   competitionId,
  //   enabled: !!competitionId,
  // });

  // Get competition from mock data
  const competition = useMemo(() => {
    if (!competitionId) return null;
    return mockCompetitions.find((comp) => comp.id === competitionId);
  }, [competitionId]);

  const isLoadingCompetition = false;
  const isLoadingExams = false;

  // Get mock exams for this competition as fallback
  const competitionExams = useMemo(() => {
    if (!competitionId) return [];
    return mockExams.filter((exam) => exam.competitionId === competitionId);
  }, [competitionId]);

  const isLoading = isLoadingCompetition || isLoadingExams;

  // Get competition name for title
  const competitionName = competition
    ? getCompetitionName(competition, currentLanguage)
    : t('competitions.competition');

  // Description for the page
  const description = t('competitions.manageExams');

  if (isLoading) {
    return (
      <PageLayout title={competitionName} description={description}>
        <Loader />
      </PageLayout>
    );
  }

  if (!competition) {
    return (
      <PageLayout title={t('competitions.competition')} description={description}>
        <EmptyState
          icon="emojiEvents"
          title={t('competitions.competitionNotFound')}
          description={t('competitions.competitionNotFoundDescription')}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout title={competitionName} description={description}>
      <CompetitionInfo competition={competition} />

      <ExamFormDialog showAddButton>
        <ExamsGrid exams={competitionExams} competitionId={id} isLoading={isLoading} />
      </ExamFormDialog>
    </PageLayout>
  );
}

export default CompetitionPage;
