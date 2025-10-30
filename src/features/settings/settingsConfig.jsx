// external imports
import { MdAccountCircle, MdTune } from 'react-icons/md';

// internal imports
import { ProfileTab, PreferencesTab } from './components';

/**
 * Settings Tabs Configuration
 * Defines the structure and content of settings page tabs
 * 
 * @param {Function} t - Translation function
 * @returns {Array} Array of tab configurations
 */
export const getSettingsTabs = (t) => [
  {
    label: t('common.profile'),
    icon: <MdAccountCircle />,
    content: <ProfileTab />,
  },
  {
    label: t('settings.preferences'),
    icon: <MdTune />,
    content: <PreferencesTab />,
  },
];

