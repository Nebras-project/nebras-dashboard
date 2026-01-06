import { useState, useRef } from 'react';
import { AddIconButton } from '@components';
import { useTranslation } from '@hooks';
import ExportButton from '@components/table/components/ExportButton';
import QuestionsTable from './QuestionsTable';
import QuestionFilter from './QuestionFilter';
import QuestionFormDialog from './QuestionFormDialog';

function QuestionsTab() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});
  const tableRef = useRef(null);

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
            actions={
              <>
                <ExportButton
                  tableRef={tableRef}
                  filename="questions"
                  disabled={false}
                  sx={{ mr: 1 }}
                />
                <AddIconButton
                  onClick={() => renderProps.onEdit(null)}
                  tooltip={t('questions.addQuestion')}
                />
              </>
            }
          />
          <QuestionsTable
            customFilters={filterParams}
            onEdit={renderProps.onEdit}
            tableRef={tableRef}
          />
        </>
      )}
    </QuestionFormDialog>
  );
}

export default QuestionsTab;
