// external imports
import { useState } from 'react';
import { Paper } from '@mui/material';

// internal imports
import { PageLayout } from '@components';
import { useTranslation } from '@hooks';
import { TabPanel, SettingsTabsHeader } from '../components';
import { getSettingsTabs } from '../settingsConfig';

function SettingsPage() {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const tabs = getSettingsTabs(t);

  return (
    <PageLayout
      title={t('settings.title')}
      description={t('settings.description')}
      maxWidth="lg"
    >
      <SettingsTabsHeader 
        value={currentTab} 
        onChange={handleTabChange} 
        items={tabs.map(({ label, icon }) => ({ label, icon }))} 
      />

      <Paper elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
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
