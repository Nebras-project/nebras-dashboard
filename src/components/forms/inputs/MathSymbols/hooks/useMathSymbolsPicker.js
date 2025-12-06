import { useState } from 'react';
import { MATH_SYMBOL_CATEGORIES } from '../constants';

/**
 * useMathSymbolsPicker Hook
 *
 * Single Responsibility: Manage math symbols picker state (active tab)
 */
export const useMathSymbolsPicker = () => {
  // Get first category key as default
  const firstCategoryKey = Object.keys(MATH_SYMBOL_CATEGORIES)[0];
  const [activeTab, setActiveTab] = useState(firstCategoryKey);
  const categories = Object.values(MATH_SYMBOL_CATEGORIES);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  const getCurrentCategory = () => MATH_SYMBOL_CATEGORIES[activeTab];

  return {
    activeTab,
    categories,
    handleTabChange,
    getCurrentCategory,
  };
};
