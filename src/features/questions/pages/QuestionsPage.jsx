import { useState } from 'react';
import { PageLayout, AddIconButton } from '@components';
import { useTranslation } from '@hooks';

import { QuestionsTable, QuestionFilter, QuestionFormDialog } from '../question';

function QuestionsPage() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});

  // TODO: Fetch questions with filter params from backend
  // const { questions, isLoading } = useQuestion({
  //   params: filterParams,
  // });

  const handleFilterChange = (newFilterParams) => {
    setFilterParams(newFilterParams);
    // React Query will automatically refetch when params change
  };

  return (
    <PageLayout title={t('questions.questions')} description={t('questions.description')}>
      <QuestionFormDialog showAddButton={false}>
        {(renderProps) => (
          <>
            <QuestionFilter
              onFilterChange={handleFilterChange}
              questions={[]} // TODO: Pass actual questions data
              addButton={
                <AddIconButton
                  onClick={() => renderProps.onEdit(null)}
                  tooltip={t('questions.addQuestion')}
                  iconName="documentPlus"
                />
              }
            />
            <QuestionsTable customFilters={filterParams} />
          </>
        )}
      </QuestionFormDialog>
    </PageLayout>
  );
}

export default QuestionsPage;
