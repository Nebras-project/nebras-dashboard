import { Box, List, Collapse } from '@mui/material';
import { MdExpandMore, MdExpandLess, MdCheck } from 'react-icons/md'; 
import { useState } from 'react';
import PropTypes from 'prop-types';
// Note: Previously used sidebar control styles are no longer needed here
import { ListButton } from '@components';

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

  return (
    <Box sx={sx}>
      {/* Dropdown Trigger Button */}
      <ListButton
        onClick={() => setIsOpen(!isOpen)}
        icon={currentOption?.icon || icon}
        text={label}
        iconSx={{ color: 'text.secondary' }}
        endContent={
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', ml: 'auto', pl: 1 }}>
            {isOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
          </Box>
        }
        sx={{
          justifyContent: 'flex-start',
          px: 2,
          width: '100%',
          ...buttonSx,
        }}
      />

      {/* Dropdown Options List */}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 1 }}>
          {options.map((option) => {
            // Only mark as selected if there's a valid currentValue and it matches
            const isSelected = currentValue && option.value === currentValue;
            return (
              <ListButton
                key={option.value}
                onClick={() => {
                  if (option.onClick) option.onClick();
                }}
                disabled={option?.disabled}
                icon={showCheckmark && isSelected ? <MdCheck size={20} /> : option.icon}
                text={option.label}
                iconSx={{ color: isSelected ? 'primary.main' : 'text.secondary' }}
                textProps={{ fontWeight: isSelected ? 600 : 400, fontSize: '0.875rem' }}
                sx={{
                  pl: indentLevel,
                  '&.Mui-disabled': { opacity: 0.5 },
                  ...listItemSx,
                }}
              />
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

