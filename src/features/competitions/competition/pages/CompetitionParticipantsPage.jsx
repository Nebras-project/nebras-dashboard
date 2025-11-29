import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

function CompetitionParticipantsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('competitions.competitionParticipants')} description="">
      {/* TODO: Implement competition participants page */}
    </PageLayout>
  );
}

export default CompetitionParticipantsPage;
