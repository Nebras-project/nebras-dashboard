// external imports
import { Box, Typography, Chip } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, UserAvatar } from '@components';
import { padding, margin } from '@constants';
import { getAdminName, getAdminRole, getAdminProfileImage } from '../utils';
import { useTranslation } from '@i18n/hooks/useTranslation';

/**
 * AdminProfileCard Component
 *
 * Single Responsibility: Display admin profile information (avatar, name, role)
 */
function AdminProfileCard({ admin }) {
  const { t } = useTranslation();
  const adminName = getAdminName(admin);
  const adminRole = getAdminRole(admin, t);

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
            name: adminName,
            profileImage: getAdminProfileImage(admin),
          }}
          size="xlarge"
          sx={{ ...margin.bottom.md }}
        />
        <Typography variant="h5" fontWeight={600} sx={{ ...margin.bottom.xs }}>
          {adminName}
        </Typography>
        <Chip label={adminRole} color="primary" size="small" />
      </Box>
    </Card>
  );
}

AdminProfileCard.propTypes = {
  admin: PropTypes.object.isRequired,
};

export default AdminProfileCard;
