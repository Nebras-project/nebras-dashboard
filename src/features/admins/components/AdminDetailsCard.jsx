// external imports
import { Grid, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, DetailField } from '@components';
import Icon from '@components/display/Icon';
import { useTranslation } from '@hooks';

/**
 * AdminDetailsCard Component
 *
 * Single Responsibility: Display admin detailed information (name, email, phone, role)
 */
function AdminDetailsCard({ admin, onEdit }) {
  const { t } = useTranslation();

  const adminName = admin.UserName || admin.userName || admin.name || 'N/A';
  const adminEmail = admin.Email || admin.email || 'N/A';
  const adminPhone = admin.Phone || admin.PhoneNumber || admin.phone || 'N/A';
  const adminRole = admin.Role || admin.role || 'N/A';

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
