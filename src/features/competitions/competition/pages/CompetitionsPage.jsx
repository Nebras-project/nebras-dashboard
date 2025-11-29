import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

import { CompetitionsGrid, CompetitionFormDialog } from '../components';
import { useCompetition } from '../hooks';
import { mockCompetitions } from '../data/mockCompetitions';

function CompetitionsPage() {
  const { t } = useTranslation();
  const { isLoading } = useCompetition();

  return (
    <PageLayout title={t('competitions.competitions')} description={t('competitions.description')}>
      <CompetitionFormDialog showAddButton={true}>
        <CompetitionsGrid competitions={mockCompetitions} isLoading={isLoading} />
      </CompetitionFormDialog>
    </PageLayout>
  );
}

export default CompetitionsPage;
