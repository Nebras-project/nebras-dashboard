import { PageLayout } from '@components';
import { useTranslation } from '@hooks';
import { AddButton } from '@components';

import { QuestionsTable } from '../components';

function QuestionsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('questions.questions')} description={t('questions.description')}>
      <AddButton label={t('questions.addQuestion')} onClick={() => console.log('Add question')} />
      <QuestionsTable />
    </PageLayout>
  );
}

export default QuestionsPage;
