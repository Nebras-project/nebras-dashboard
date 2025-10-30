import { Box } from '@mui/material';
import ProfileHero from './ProfileHero';
import PersonalInfoCard from './PersonalInfoCard';
import SecurityCard from './SecurityCard';
import AccountActionsCard from './AccountActionsCard';

function ProfileTab() {
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ProfileHero />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
          <PersonalInfoCard />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <SecurityCard />
            <AccountActionsCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileTab;


