import { PageLayout } from '@components';
import { useTranslation } from '@hooks';
import { AddButton } from '@components';

import { CompetitionsTable } from '../components';

function CompetitionsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('competitions.competitions')} description={t('competitions.description')}>
      <AddButton
        label={t('competitions.addCompetition')}
        onClick={() => console.log('Add competition')}
      />
      <CompetitionsTable />
    </PageLayout>
  );
}

export default CompetitionsPage;
