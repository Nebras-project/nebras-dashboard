import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { MdExpandMore, MdExpandLess, MdCheck } from 'react-icons/md'; 
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Dropdown Component
 * A flexible dropdown that can be used anywhere in the application
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon to display next to the label
 * @param {string} props.label - Label text for the dropdown trigger
 * @param {Array} props.options - Array of {value, label, icon, onClick} objects
 * @param {string} props.currentValue - Currently selected value
 * @param {boolean} props.showCheckmark - Whether to show checkmark on selected item (default: true)
 * @param {Object} props.sx - Custom styles for the root element
 * @param {Object} props.buttonSx - Custom styles for the trigger button
 * @param {Object} props.listItemSx - Custom styles for dropdown items
 * @param {number} props.indentLevel - Indentation level for nested items (default: 4)
 * @param {boolean} props.defaultOpen - Whether dropdown is open by default (default: false)
 */
function Dropdown({ 
  icon, 
  label, 
  options, 
  currentValue, 
  showCheckmark = true,
  sx = {},
  buttonSx = {},
  listItemSx = {},
  indentLevel = 4,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Get current option
  const currentOption = options.find(opt => opt.value === currentValue);

  // Default button styles
  const defaultButtonStyles = {
    borderRadius: 1,
    minHeight: 40,
    transition: 'all 0.2s',
    '&:hover': {
      bgcolor: 'action.hover',
    },
  };

  // Default icon styles
  const defaultIconStyles = {
    minWidth: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Box sx={sx}>
      {/* Dropdown Trigger Button */}
      <ListItemButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          ...defaultButtonStyles,
          justifyContent: 'flex-start',
          px: 2,
          ...buttonSx,
        }}
      >
        {icon && (
          <ListItemIcon
            sx={{
              ...defaultIconStyles,
              color: 'text.secondary',
            }}
          >
            {currentOption?.icon || icon}
          </ListItemIcon>
        )}
        
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', ml: 'auto', pl: 1 }}>
          {isOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
        </Box>
      </ListItemButton>

      {/* Dropdown Options List */}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 2 }}>
          {options.map((option) => {
            // Only mark as selected if there's a valid currentValue and it matches
            const isSelected = currentValue && option.value === currentValue;
            return (
              <ListItemButton
                key={option.value}
                onClick={() => {
                  if (option.onClick) {
                    option.onClick();
                  }
                }}
                disabled={option?.disabled}
                sx={{
                  ...defaultButtonStyles,
                  pl: indentLevel,
                  '&:hover': {
                    bgcolor: isSelected ? 'action.selected' : 'action.hover',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5,
                  },
                  ...listItemSx,
                }}
              >
                <ListItemIcon
                  sx={{
                    ...defaultIconStyles,
                    minWidth: 40,
                    color: isSelected ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {showCheckmark && isSelected ? <MdCheck size={20} /> : option.icon}
                </ListItemIcon>
                <ListItemText
                  primary={option.label}
                  secondary={option.description}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                  secondaryTypographyProps={{
                    fontSize: '0.75rem',
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

Dropdown.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    description: PropTypes.string,
  })).isRequired,
  currentValue: PropTypes.string.isRequired,
  showCheckmark: PropTypes.bool,
  sx: PropTypes.object,
  buttonSx: PropTypes.object,
  listItemSx: PropTypes.object,
  indentLevel: PropTypes.number,
  defaultOpen: PropTypes.bool,
};

export default Dropdown;

