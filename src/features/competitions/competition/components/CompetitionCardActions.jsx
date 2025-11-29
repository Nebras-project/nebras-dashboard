import PropTypes from 'prop-types';
import { ActionsMenu, DeleteAction } from '@components';
import { Icon } from '@components';
import useTranslation from '@i18n/hooks/useTranslation';
import CompetitionStatusMenu from './CompetitionStatusMenu';
import { useDeleteCompetition } from '../hooks';
import { getCompetitionName } from '../utils';
import { useLanguage } from '@hooks';

function CompetitionCardActions({
  competition,
  onViewParticipants,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { deleteCompetition } = useDeleteCompetition();

  const handleDelete = onDelete || ((comp) => deleteCompetition(comp));

  return (
    <ActionsMenu
      tooltip={t('common.actions')}
      contentProps={{
        minWidth: 250,
      }}
      actions={[
        <CompetitionStatusMenu
          key="status"
          competition={competition}
          onStatusChange={onStatusChange}
        />,
        {
          label: t('competitions.viewCompetition'),
          icon: <Icon name="visibility" size={18} />,
          onClick: () => onView?.(competition),
        },
        {
          label: t('competitions.competitionParticipants'),
          icon: <Icon name="groups" size={18} />,
          onClick: () => onViewParticipants?.(competition),
        },
        {
          label: t('competitions.editCompetition'),
          icon: <Icon name="edit" size={18} />,
          onClick: () => onEdit?.(competition),
        },

        <DeleteAction
          key="delete"
          row={competition}
          deleteFn={handleDelete}
          getItemName={(comp) => {
            const name = getCompetitionName(comp, currentLanguage);
            return name !== 'N/A' ? name : t('competitions.competition');
          }}
          entityName="competitions"
          label={t('competitions.deleteCompetition')}
        />,
      ]}
    />
  );
}

CompetitionCardActions.propTypes = {
  competition: PropTypes.object.isRequired,
  onView: PropTypes.func,
  onViewParticipants: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onStatusChange: PropTypes.func,
};

export default CompetitionCardActions;
