// external imports
import { Stack } from '@mui/material';

// internal imports
import ProfileHero from './ProfileHero';
import PersonalInfoCard from './PersonalInfoCard';
import SecurityCard from './SecurityCard';
import AccountActionsCard from './AccountActionsCard';
import { spacing, padding } from '@constants';

function ProfileTab() {
  return (
    <Stack spacing={spacing.values.lg} sx={{ ...padding.all.lg }} bgcolor="background.default">
      <ProfileHero />
      <PersonalInfoCard />
      <SecurityCard />
      <AccountActionsCard />
    </Stack>
  );
}

export default ProfileTab;
