// external imports
import { Box, Typography, Chip } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, UserAvatar } from '@components';
import { padding, margin } from '@constants';

/**
 * AdminProfileCard Component
 *
 * Single Responsibility: Display admin profile information (avatar, name, role)
 */
function AdminProfileCard({ admin }) {
  const adminName = admin.UserName || admin.userName || admin.name || 'N/A';
  const adminRole = admin.Role || admin.role || 'N/A';

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
            profileImage: admin.ProfileImg || admin.profileImage,
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
