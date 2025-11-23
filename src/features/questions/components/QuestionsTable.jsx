import { useMemo } from 'react';

import { ActionsMenu } from '@components';
import Table, { useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';

import createQuestionColumns from '../utils/createQuestionColumns.jsx';

function QuestionsTable() {
  const { t } = useTranslation();

  const {
    paginationModel,
    sortModel,
    filterModel,
    handlePaginationModelChange,
    handleSortModelChange,
    handleFilterModelChange,
    queryString,
  } = useTable();

  console.log(queryString);

  const columns = useMemo(
    () =>
      createQuestionColumns({
        t,
        includeActions: true,
        renderActions: ({ row }) => (
          <ActionsMenu
            tooltip={t('common.actions')}
            actions={[
              {
                label: t('questions.viewQuestion'),
                icon: <Icon name="visibility" size={18} />,
                onClick: () => console.log('View question', row),
              },
              {
                label: t('questions.editQuestion'),
                icon: <Icon name="edit" size={18} />,
                onClick: () => console.log('Edit question', row),
              },
              {
                label: t('questions.deleteQuestion'),
                icon: <Icon name="delete" size={18} />,
                onClick: () => console.log('Delete question', row),
              },
            ]}
          />
        ),
      }),
    [t]
  );

  // TODO: Use queryString to fetch data from server
  // Example: const { data, isLoading } = useQuery(['questions', queryString], () => fetchQuestions(queryString));

  return (
    <Table
      rows={[]}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      filterModel={filterModel}
      onFilterModelChange={handleFilterModelChange}
      disableRowSelectionOnClick
    />
  );
}

export default QuestionsTable;
