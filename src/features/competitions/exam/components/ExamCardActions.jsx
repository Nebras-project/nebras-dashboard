import PropTypes from 'prop-types';
import { ActionsMenu, DeleteAction } from '@components';
import { Icon } from '@components';
import useTranslation from '@i18n/hooks/useTranslation';
import { getExamName } from '../utils';
import { useLanguage } from '@hooks';

function ExamCardActions({ exam, onViewResults, onEdit, onDelete }) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const handleDelete = onDelete || (() => {});

  return (
    <ActionsMenu
      tooltip={t('common.actions')}
      contentProps={{
        minWidth: 200,
      }}
      actions={[
        {
          label: t('competitions.viewExamResults'),
          icon: <Icon name="barChart" size={18} />,
          onClick: () => onViewResults?.(),
        },
        {
          label: t('competitions.editExam'),
          icon: <Icon name="edit" size={18} />,
          onClick: () => onEdit?.(),
        },
        <DeleteAction
          key="delete"
          row={exam}
          deleteFn={handleDelete}
          getItemName={(examItem) => {
            const name = getExamName(examItem, currentLanguage);
            return name !== 'N/A' ? name : t('competitions.exam');
          }}
          entityName="competitions"
          label={t('competitions.deleteExam')}
        />,
      ]}
    />
  );
}

ExamCardActions.propTypes = {
  exam: PropTypes.object.isRequired,
  onViewResults: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ExamCardActions;
