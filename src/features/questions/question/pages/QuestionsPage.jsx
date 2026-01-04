import { PageLayout } from '@components';

import QuestionsTab from '../components/QuestionsTab';
import { useQuestionsPageTabs } from '../hooks';
import { FormsTab } from '../../ministerialForms/components';
import QuestionsTabsHeader from '../components/QuestionsTabsHeader';
import TabPanel from '../components/TabPanel';

function QuestionsPage() {
  const { currentTab, handleTabChange, title, description } = useQuestionsPageTabs();

  return (
    <PageLayout title={title} description={description}>
      <QuestionsTabsHeader value={currentTab} onChange={handleTabChange} />

      <TabPanel value={currentTab} index={0}>
        <QuestionsTab />
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <FormsTab />
      </TabPanel>
    </PageLayout>
  );
}

export default QuestionsPage;
