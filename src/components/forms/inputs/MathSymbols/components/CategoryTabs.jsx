// external imports
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@mui/material';
import { useTranslation } from '@hooks';
import { MATH_SYMBOL_CATEGORIES } from '../constants';

/**
 * CategoryTabs Component
 *
 * Single Responsibility: Display category tabs for navigating between symbol categories
 */
function CategoryTabs({ activeTab, onTabChange }) {
  const { currentLanguage } = useTranslation();
  const isArabic = currentLanguage === 'ar';
  const categoryEntries = Object.entries(MATH_SYMBOL_CATEGORIES);

  return (
    <Tabs
      value={activeTab}
      onChange={(e, newValue) => onTabChange(newValue)}
      variant="scrollable"
      scrollButtons="auto"
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      {categoryEntries.map(([key, category]) => (
        <Tab
          key={key}
          value={key}
          label={isArabic ? category.labelAr : category.label}
          sx={{ minWidth: 80, fontSize: '0.75rem' }}
        />
      ))}
    </Tabs>
  );
}

CategoryTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default CategoryTabs;
