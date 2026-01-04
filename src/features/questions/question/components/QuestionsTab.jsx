import { useState } from 'react';
import { AddIconButton } from '@components';
import { useTranslation } from '@hooks';
import QuestionsTable from './QuestionsTable';
import QuestionFilter from './QuestionFilter';
import QuestionFormDialog from './QuestionFormDialog';

function QuestionsTab() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});

  const handleFilterChange = (newFilterParams) => {
    setFilterParams(newFilterParams);
    // React Query will automatically refetch when params change
  };

  return (
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
              />
            }
          />
          <QuestionsTable customFilters={filterParams} onEdit={renderProps.onEdit} />
        </>
      )}
    </QuestionFormDialog>
  );
}

export default QuestionsTab;
