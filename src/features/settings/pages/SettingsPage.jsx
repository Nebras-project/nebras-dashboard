// external imports
import { useState } from 'react';
import { Paper } from '@mui/material';

// internal imports
import { PageLayout } from '@components';
import { useTranslation } from '@hooks';
import { borderWidth } from '@theme/components';
import { TabPanel, SettingsTabsHeader } from '../components';
import { getSettingsTabs } from '../utils/settingsConfig';

function SettingsPage() {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const tabs = getSettingsTabs(t);

  return (
    <PageLayout title={t('settings.title')} description={t('settings.description')}>
      <SettingsTabsHeader
        value={currentTab}
        onChange={handleTabChange}
        items={tabs.map(({ label, icon }) => ({ label, icon }))}
      />

      <Paper sx={{ border: borderWidth.xxs, borderColor: 'divider' }}>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={currentTab} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Paper>
    </PageLayout>
  );
}

export default SettingsPage;
