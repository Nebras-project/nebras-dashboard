// external imports
import { Grid, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, DetailField } from '@components';
import Icon from '@components/display/Icon';
import { useTranslation } from '@i18n/hooks/useTranslation';
import { getManagerName, getManagerEmail, getManagerPhone, getManagerRole } from '../utils';

/**
 * ManagerDetailsCard Component
 *
 * Single Responsibility: Display manager detailed information (name, email, phone, role)
 */
function ManagerDetailsCard({ manager, onEdit }) {
  const { t } = useTranslation();

  const managerName = getManagerName(manager);
  const managerEmail = getManagerEmail(manager);
  const managerPhone = getManagerPhone(manager);
  const managerRole = getManagerRole(manager, t);

  return (
    <Card
      title={t('managers.personalInformation')}
      action={
        <IconButton
          onClick={() => onEdit(manager)}
          size="small"
          sx={{ color: 'primary.main' }}
          aria-label={t('managers.editManager')}
        >
          <Icon name="edit" size={20} />
        </IconButton>
      }
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
