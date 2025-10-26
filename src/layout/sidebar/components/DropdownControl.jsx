// external imports
import { useMemo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { getSidebarControlButtonStyles } from '@constants';
import SidebarButton from './SidebarButton';
import { Dropdown } from '@components';

/**
 * DropdownControl Component
 * Sidebar-specific dropdown wrapper that adds collapsed mode behavior
 * Uses the generic Dropdown component for expanded mode
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {string} props.label - Label text for the dropdown
 * @param {Array} props.options - Array of {value, label, icon, onClick} objects
 * @param {string} props.currentValue - Currently selected value
 * @param {boolean} props.collapsed - Whether sidebar is collapsed
 */

function DropdownControl({ icon, label, options, currentValue, collapsed }) {
  const buttonStyles = useMemo(() => getSidebarControlButtonStyles(), []);

  // Get current option
  const currentOption = options.find(opt => opt.value === currentValue);

  // When collapsed, show simple toggle button
  if (collapsed) {
    // For binary options (like light/dark), toggle between them
    const handleToggle = () => {
      const currentIndex = options.findIndex(opt => opt.value === currentValue);
      const nextIndex = (currentIndex + 1) % options.length;
      const nextOption = options[nextIndex];
      if (nextOption?.onClick) {
        nextOption.onClick();
      }
    };

    return (
      <SidebarButton
        onClick={handleToggle}
        icon={currentOption?.icon || icon}
        text={`${label}: ${currentOption?.label || ''}`}
        collapsed={collapsed}
        iconSx={{ color: 'text.secondary' }}
      />
    );
  }

  // When expanded, use the generic Dropdown component with sidebar-specific styles
  return (
    <Dropdown
      icon={icon}
      label={label}
      options={options}
      currentValue={currentValue}
      showCheckmark={true}
      buttonSx={{
        ...buttonStyles,
        justifyContent: 'flex-start',
        px: 2,
      }}
      listItemSx={{
        ...buttonStyles,
      }}
      indentLevel={4}
    />
  );
}

DropdownControl.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
  currentValue: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default DropdownControl;

