// external imports
import { Icon } from '@components';

// internal imports
import { ProfileTab, PreferencesTab } from './components';

export const getSettingsTabs = (t) => [
  {
    label: t('common.profile'),
    icon: <Icon name="accountCircle" />,
    content: <ProfileTab />,
  },
  {
    label: t('settings.preferences'),
    icon: <Icon name="tune" />,
    content: <PreferencesTab />,
  },
];
