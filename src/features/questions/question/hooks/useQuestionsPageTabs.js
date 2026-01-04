import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from '@hooks';

/**
 * Custom hook to manage Questions/Forms tabs state and URL sync
 * 
 * @returns {Object} Tab management utilities
 * @returns {number} returns.currentTab - Current active tab index (0: Questions, 1: Forms)
 * @returns {Function} returns.handleTabChange - Handler for tab change events
 * @returns {string} returns.title - Page title based on active tab
 * @returns {string} returns.description - Page description based on active tab
 * 
 * @example
 * const { currentTab, handleTabChange, title, description } = useQuestionsPageTabs();
 */
function useQuestionsPageTabs() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState(0);

  // Initialize tab from URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'forms') {
      setCurrentTab(1);
    } else {
      setCurrentTab(0);
    }
  }, [searchParams]);

  // Handle tab change and update URL
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    // Update URL parameter
    if (newValue === 1) {
      setSearchParams({ tab: 'forms' });
    } else {
      setSearchParams({});
    }
  };

  // Determine page title and description based on active tab
  const title = currentTab === 0 ? t('questions.questions') : t('ministerialForms.forms');
  const description =
    currentTab === 0 ? t('questions.description') : t('ministerialForms.description');

  return {
    currentTab,
    handleTabChange,
    title,
    description,
  };
}

export default useQuestionsPageTabs;

