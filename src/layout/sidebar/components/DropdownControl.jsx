import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { MdExpandMore, MdExpandLess, MdCheck } from 'react-icons/md';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  getSidebarControlButtonStyles,
  getSidebarControlIconStyles,
  getSidebarControlTextProps,
} from '../../constants';
import SidebarButton from './SidebarButton';

/**
 * DropdownControl Component
 * Reusable dropdown control for sidebar with collapsed/expanded behavior
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {string} props.label - Label text for the dropdown
 * @param {Array} props.options - Array of {value, label, icon} objects
 * @param {string} props.currentValue - Currently selected value
 * @param {Function} props.onChange - Callback when option is selected
 * @param {boolean} props.collapsed - Whether sidebar is collapsed
 */
function DropdownControl({ icon, label, options, currentValue, onChange, collapsed }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonStyles = useMemo(() => getSidebarControlButtonStyles(), []);
  const iconStyles = useMemo(() => getSidebarControlIconStyles(), []);
  const textProps = useMemo(() => getSidebarControlTextProps(), []);

  // Get current option
  const currentOption = options.find(opt => opt.value === currentValue);

  // When collapsed, show simple toggle button
  if (collapsed) {
    // For binary options (like light/dark), toggle between them
    const handleToggle = () => {
      const currentIndex = options.findIndex(opt => opt.value === currentValue);
      const nextIndex = (currentIndex + 1) % options.length;
      onChange(options[nextIndex].value);
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

  // When expanded, show dropdown list
  return (
    <Box>
      <ListItemButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          ...buttonStyles,
          justifyContent: 'flex-start',
          px: 2,
        }}
      >
        <ListItemIcon
          sx={{
            ...iconStyles,
            minWidth: iconStyles.minWidth,
            color: 'text.secondary',
          }}
        >
          {currentOption?.icon || icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={textProps}
        />
        {isOpen ? <MdExpandLess /> : <MdExpandMore />}
      </ListItemButton>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {options.map((option) => {
            const isSelected = option.value === currentValue;
            return (
              <ListItemButton
                key={option.value}
                onClick={() => !isSelected && onChange(option.value)}
                sx={{
                  ...buttonStyles,
                  pl: 4,
                  '&:hover': {
                    bgcolor: isSelected ? 'action.selected' : 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    ...iconStyles,
                    minWidth: 40,
                    color: isSelected ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {isSelected ? <MdCheck /> : option.icon}
                </ListItemIcon>
                <ListItemText
                  primary={option.label}
                  primaryTypographyProps={{
                    ...textProps,
                    fontWeight: isSelected ? 600 : 400,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
}

DropdownControl.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
  })).isRequired,
  currentValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default DropdownControl;

