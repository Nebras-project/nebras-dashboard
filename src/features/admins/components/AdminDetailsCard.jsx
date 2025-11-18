// external imports
import { Grid, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, DetailField } from '@components';
import Icon from '@components/display/Icon';
import { useTranslation } from '@hooks';
import { getAdminName, getAdminEmail, getAdminPhone, getAdminRole } from '../utils';

/**
 * AdminDetailsCard Component
 *
 * Single Responsibility: Display admin detailed information (name, email, phone, role)
 */
function AdminDetailsCard({ admin, onEdit }) {
  const { t } = useTranslation();

  const adminName = getAdminName(admin);
  const adminEmail = getAdminEmail(admin);
  const adminPhone = getAdminPhone(admin);
  const adminRoleRaw = getAdminRole(admin);
  // Translate role value (e.g., "Curriculum Manager" -> "مدير المناهج")
  const adminRole =
    adminRoleRaw && adminRoleRaw !== 'N/A'
      ? t(`admins.roles.${adminRoleRaw}`, { defaultValue: adminRoleRaw })
      : adminRoleRaw;

  return (
    <Card
      title={t('admins.personalInformation')}
      action={
        <IconButton
          onClick={() => onEdit(admin)}
          size="small"
          sx={{ color: 'primary.main' }}
          aria-label={t('admins.editAdmin')}
        >
          <Icon name="edit" size={20} />
        </IconButton>
      }
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
