// external imports
import { Box, Typography, Chip } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, UserAvatar } from '@components';
import { padding, margin } from '@constants';
import { getManagerName, getManagerRole, getManagerProfileImage } from '../utils';
import { useTranslation } from '@i18n/hooks/useTranslation';

/**
 * ManagerProfileCard Component
 *
 * Single Responsibility: Display manager profile information (avatar, name, role)
 */
function ManagerProfileCard({ manager }) {
  const { t } = useTranslation();
  const managerName = getManagerName(manager);
  const managerRole = getManagerRole(manager, t);

  return (
    <Card sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          ...padding.all.lg,
          height: '100%',
        }}
      >
        <UserAvatar
          user={{
            name: managerName,
            profileImage: getManagerProfileImage(manager),
          }}
          size="xlarge"
          sx={{ ...margin.bottom.md }}
        />
        <Typography variant="h5" fontWeight={600} sx={{ ...margin.bottom.xs }}>
          {managerName}
        </Typography>
        <Chip label={managerRole} color="primary" size="small" />
      </Box>
    </Card>
  );
}

ManagerProfileCard.propTypes = {
  manager: PropTypes.object.isRequired,
};

export default ManagerProfileCard;
