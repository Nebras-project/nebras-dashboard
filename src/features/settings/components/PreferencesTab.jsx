import { Stack } from '@mui/material';
import LanguageCard from './LanguageCard';
import ThemeCard from './ThemeCard';
import ColorSettingsCard from './ColorSettingsCard';

function PreferencesTab() {
  return (
    <Stack spacing={3} sx={{ p: 4 }}>
      <LanguageCard />
      <ThemeCard />
      <ColorSettingsCard />
    </Stack>
  );
}

export default PreferencesTab;


