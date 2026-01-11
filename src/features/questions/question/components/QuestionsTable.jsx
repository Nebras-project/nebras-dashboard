import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { ActionsMenu, DeleteAction } from '@components';
import Table, { useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';
import { NAVIGATION_PATHS } from '@config';

import { createQuestionColumns } from '../utils';
import { useQuestion, useDeleteQuestion } from '../hooks';
import { getTopTableStyles } from '@constants/layout';
import { useRowClick } from '@hooks';

function QuestionsTable({ customFilters = {}, onEdit, tableRef }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    paginationModel,
    sortModel,
    handlePaginationModelChange,
    handleSortModelChange,
    queryString,
  } = useTable({ customFilters });

  // Fetch questions using the query string
  const { questions, totalCount, isLoading } = useQuestion({
    queryString,
  });

  // Delete question hook
  const { deleteQuestion } = useDeleteQuestion();

  // Extract  class from filters
  const classValue = customFilters.Class || '';

  const columns = useMemo(
    () =>
      createQuestionColumns({
        t,
        includeActions: true,
        class: classValue,
        renderActions: ({ row }) => (
          <ActionsMenu
            tooltip={t('common.actions')}
            actions={[
              {
                label: t('questions.viewQuestion'),
                icon: <Icon name="visibility" size={18} />,
                onClick: () => navigate(NAVIGATION_PATHS.QUESTIONS.BY_ID(row.id)),
              },
              {
                label: t('questions.editQuestion'),
                icon: <Icon name="edit" size={18} />,
                onClick: () => onEdit?.(row),
              },
              <DeleteAction
                key="delete"
                row={row}
                deleteFn={deleteQuestion}
                getItemName={(question) =>
                  question.text || t('questions.questionNumber', { number: question.id })
                }
                entityName="questions"
                label={t('questions.deleteQuestion')}
              />,
            ]}
          />
        ),
      }),
    [t, classValue, onEdit, deleteQuestion, navigate]
  );

  const handleRowClick = useRowClick({
    navigateTo: (row, { navigate: nav } = {}) => nav(NAVIGATION_PATHS.QUESTIONS.BY_ID(row.id)),
  });

  return (
    <Table
      ref={tableRef}
      rows={questions || []}
      columns={columns}
      rowCount={totalCount || 0}
      onRowClick={handleRowClick}
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      loading={isLoading}
      disableRowSelectionOnClick
      sx={getTopTableStyles()}
    />
  );
}

QuestionsTable.propTypes = {
  customFilters: PropTypes.object, // Filter params from QuestionFilter
  onEdit: PropTypes.func, // Callback function to handle edit action
  tableRef: PropTypes.object,
};

export default QuestionsTable;
