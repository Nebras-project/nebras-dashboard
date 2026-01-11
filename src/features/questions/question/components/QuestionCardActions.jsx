import PropTypes from 'prop-types';
import { ActionsMenu, DeleteAction } from '@components';
import { Icon } from '@components';
import { useTranslation } from '@hooks';

/**
 * QuestionCardActions Component
 *
 * Single Responsibility: Render actions menu for question card
 */
function QuestionCardActions({ question, onEdit, onDelete }) {
  const { t } = useTranslation();

  const handleDelete = (q) => {
    onDelete(q);
  };

  const getQuestionName = (q) => {
    return q.question || t('questions.questionNumber', { number: q.id });
  };

  return (
    <ActionsMenu
      tooltip={t('common.actions')}
      contentProps={{
        minWidth: 200,
      }}
      actions={[
        {
          label: t('questions.editQuestion'),
          icon: <Icon name="edit" size={18} />,
          onClick: () => onEdit?.(question),
        },
        <DeleteAction
          key="delete"
          row={question}
          deleteFn={handleDelete}
          getItemName={getQuestionName}
          entityName="questions"
          label={t('questions.deleteQuestion')}
        />,
      ]}
    />
  );
}

QuestionCardActions.propTypes = {
  question: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default QuestionCardActions;

