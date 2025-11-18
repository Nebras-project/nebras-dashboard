// external imports
import { Stack } from '@mui/material';

// internal imports
import LanguageCard from './LanguageCard';
import ThemeCard from './ThemeCard';
import ColorSettingsCard from './ColorSettingsCard';
import { spacing, padding } from '@constants';

function PreferencesTab() {
  return (
    <Stack
      spacing={spacing.values.lg}
      sx={{ ...padding.all.lg, backgroundColor: 'background.default' }}
    >
      <LanguageCard />
      <ThemeCard />
      <ColorSettingsCard />
    </Stack>
  );
}

export default PreferencesTab;
