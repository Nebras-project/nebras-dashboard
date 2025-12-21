// external imports
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// internal imports
import { Card, DetailField, DeleteAction, ActionsMenu } from '@components';
import Icon from '@components/display/Icon';
import { useTranslation } from '@i18n/hooks/useTranslation';
import { NAVIGATION_PATHS } from '@config';
import { getManagerName, getManagerEmail, getManagerPhone, getManagerRole } from '../utils';
import { useDeleteManager } from '../hooks';

/**
 * ManagerDetailsCard Component
 *
 * Single Responsibility: Display manager detailed information (name, email, phone, role)
 */
function ManagerDetailsCard({ manager, onEdit }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteManager } = useDeleteManager({
    onSuccess: () => navigate(NAVIGATION_PATHS.MANAGERS.BASE),
  });

  const managerName = getManagerName(manager);
  const managerEmail = getManagerEmail(manager);
  const managerPhone = getManagerPhone(manager);
  const managerRole = getManagerRole(manager, t);

  const actions = [
    {
      label: t('managers.editManager'),
      icon: <Icon name="edit" size={20} />,
      onClick: () => onEdit(manager),
    },
    <DeleteAction
      key="delete"
      row={manager}
      deleteFn={deleteManager}
      getItemName={(item) => getManagerName(item)}
      entityName="managers"
      label={t('managers.deleteManager')}
    />,
  ];

  return (
    <Card
      title={t('managers.personalInformation')}
      action={<ActionsMenu actions={actions} />}
      sx={{ height: '100%' }}
    >
      <Grid container spacing={2}>
        <DetailField mobile={6} label={t('managers.managerName')} value={managerName} />
        <DetailField mobile={6} label={t('managers.managerEmail')} value={managerEmail} />
        <DetailField mobile={6} label={t('managers.managerPhone')} value={managerPhone} />
        <DetailField mobile={6} label={t('managers.role')} value={managerRole} />
      </Grid>
    </Card>
  );
}

ManagerDetailsCard.propTypes = {
  manager: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ManagerDetailsCard;
