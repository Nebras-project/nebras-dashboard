import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { ActionsMenu } from '@components';
import Table, { useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';

import { createQuestionColumns } from '../../utils';

function QuestionsTable({ customFilters = {} }) {
  const { t } = useTranslation();

  const {
    paginationModel,
    sortModel,
    handlePaginationModelChange,
    handleSortModelChange,
    queryString,
  } = useTable({ customFilters });

  console.log(queryString);

  // Extract type and category from filters
  const type = customFilters.type || '';
  const category = customFilters.category || '';

  const columns = useMemo(
    () =>
      createQuestionColumns({
        t,
        includeActions: true,
        type,
        category,
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
    [t, type, category]
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
      disableRowSelectionOnClick
      sx={{ borderTop: 'none', borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
    />
  );
}

QuestionsTable.propTypes = {
  customFilters: PropTypes.object, // Filter params from QuestionFilter
};

export default QuestionsTable;
