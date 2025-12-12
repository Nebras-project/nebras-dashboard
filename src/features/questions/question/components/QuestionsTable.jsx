import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { ActionsMenu, DeleteAction } from '@components';
import Table, { useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';
import { NAVIGATION_PATHS } from '@config';

import { createQuestionColumns } from '../../utils';
import { useQuestion, useDeleteQuestion } from '../hooks';
import dummyQuestions from '../../utils/dummyQuestionsData';

function QuestionsTable({ customFilters = {}, onEdit }) {
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
  const { questions, isLoading } = useQuestion({
    queryString,
  });

  // Delete question hook
  const { deleteQuestion } = useDeleteQuestion();

  // Use dummy data as fallback for development/preview
  // TODO: Remove this when real API is connected
  const displayQuestions = questions || dummyQuestions;

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
                  question.Question || t('questions.questionNumber', { number: question.id })
                }
                entityName="questions"
                label={t('questions.deleteQuestion')}
              />,
            ]}
          />
        ),
      }),
    [t, type, category, onEdit, deleteQuestion, navigate]
  );

  return (
    <Table
      rows={displayQuestions}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      loading={isLoading}
      disableRowSelectionOnClick
      sx={{ borderTop: 'none', borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
    />
  );
}

QuestionsTable.propTypes = {
  customFilters: PropTypes.object, // Filter params from QuestionFilter
  onEdit: PropTypes.func, // Callback function to handle edit action
};

export default QuestionsTable;
