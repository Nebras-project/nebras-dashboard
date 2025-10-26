import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSidebarControlButtonStyles } from '../../constants';
import { useTranslation, useSidebarNavigation } from '../../../hooks';
import SidebarButton from './SidebarButton';
import Dropdown from '../../../components/Dropdown';

/**
 * NavigationDropdown Component
 * Navigation-specific dropdown wrapper for sidebar items with children
 * Handles collapsed mode with toggle behavior and navigation
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {string} props.label - Label text for the dropdown (already translated)
 * @param {Array} props.items - Array of child navigation items {text, icon, path}
 * @param {boolean} props.collapsed - Whether sidebar is collapsed
 */
function NavigationDropdown({ icon, label, items, collapsed }) {
  const { t } = useTranslation();
  const location = useLocation();
  const { handleNavigation } = useSidebarNavigation();
  const buttonStyles = useMemo(() => getSidebarControlButtonStyles(), []);

  // Check if any child is active
  const isAnyChildActive = items.some(child => location.pathname === child.path);

  // Convert items to dropdown options
  const options = items.map(child => ({
    value: child.path,
    label: t(child.text),
    icon: child.icon,
    onClick: () => handleNavigation(child.path),
  }));

  // Get current active option
  const currentValue = items.find(child => location.pathname === child.path)?.path || items[0]?.path;

  // When collapsed, show simple button that navigates to first child
  if (collapsed) {
    const handleClick = () => {
      // If a child is active, stay there, otherwise go to first child
      const targetPath = isAnyChildActive 
        ? location.pathname 
        : items[0]?.path;
      handleNavigation(targetPath);
    };

    return (
      <SidebarButton
        onClick={handleClick}
        icon={icon}
        text={label}
        collapsed={collapsed}
        selected={isAnyChildActive}
        iconSx={{ 
          color: isAnyChildActive ? 'inherit' : 'text.secondary',
        }}
      />
    );
  }

  // Handle dropdown trigger click - navigate to first option
  const handleTriggerClick = () => {
    // Navigate to first option when clicking the dropdown trigger
    if (items[0]?.path) {
      handleNavigation(items[0].path);
    }
  };

  // When expanded, use the generic Dropdown component with unified styles
  return (
    <Dropdown
      icon={icon}
      label={label}
      options={options}
      currentValue={currentValue}
      showCheckmark={true}
      onTriggerClick={handleTriggerClick}
      sx={{
        width: '100%',
      }}
      buttonSx={{
        ...buttonStyles,
        justifyContent: 'flex-start',
        px: 2,
        width: '100%',
      }}
      listItemSx={{
        ...buttonStyles,
      }}
      indentLevel={6}  // Increased indentation for nested items
    />
  );
}

NavigationDropdown.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.node,
    path: PropTypes.string.isRequired,
  })).isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default NavigationDropdown;

