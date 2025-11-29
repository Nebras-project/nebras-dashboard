import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

function CompetitionResultPage() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('competitions.results')} description="">
      {/* TODO: Implement competition result page */}
    </PageLayout>
  );
}

export default CompetitionResultPage;
