// external imports
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// internal imports
import { Card, DetailField, DeleteAction, ActionsMenu } from '@components';
import Icon from '@components/display/Icon';
import { useTranslation } from '@i18n/hooks/useTranslation';
import { NAVIGATION_PATHS } from '@config';
import { getAdminName, getAdminEmail, getAdminPhone, getAdminRole } from '../utils';
import { useDeleteAdmin } from '../hooks';

/**
 * AdminDetailsCard Component
 *
 * Single Responsibility: Display admin detailed information (name, email, phone, role)
 */
function AdminDetailsCard({ admin, onEdit }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteAdmin } = useDeleteAdmin({
    onSuccess: () => navigate(NAVIGATION_PATHS.ADMINS.BASE),
  });

  const adminName = getAdminName(admin);
  const adminEmail = getAdminEmail(admin);
  const adminPhone = getAdminPhone(admin);
  const adminRole = getAdminRole(admin, t);

  const actions = [
    {
      label: t('admins.editAdmin'),
      icon: <Icon name="edit" size={20} />,
      onClick: () => onEdit(admin),
    },
    <DeleteAction
      key="delete"
      row={admin}
      deleteFn={deleteAdmin}
      getItemName={(item) => getAdminName(item)}
      entityName="admins"
      label={t('admins.deleteAdmin')}
    />,
  ];

  return (
    <Card
      title={t('admins.personalInformation')}
      action={<ActionsMenu actions={actions} />}
      sx={{ height: '100%' }}
    >
      <Grid container spacing={2}>
        <DetailField mobile={6} label={t('admins.adminName')} value={adminName} />
        <DetailField mobile={6} label={t('admins.adminEmail')} value={adminEmail} />
        <DetailField mobile={6} label={t('admins.adminPhone')} value={adminPhone} />
        <DetailField mobile={6} label={t('admins.role')} value={adminRole} />
      </Grid>
    </Card>
  );
}

AdminDetailsCard.propTypes = {
  admin: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default AdminDetailsCard;
