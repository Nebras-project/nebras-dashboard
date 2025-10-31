// external imports
import { Box, List, Collapse } from '@mui/material';
import { MdExpandMore, MdExpandLess, MdCheck } from 'react-icons/md';
import { useState } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { ListButton } from '@components';
import { padding } from '@constants';

function Dropdown({
  icon,
  label,
  options,
  currentValue,
  showCheckmark = true,
  sx = {},
  buttonSx = {},
  listItemSx = {},
  listContainerSx = {},
  indentLevel = 4,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const currentOption = options.find((opt) => opt.value === currentValue);

  return (
    <Box sx={sx}>
      <ListButton
        onClick={() => setIsOpen(!isOpen)}
        icon={currentOption?.icon || icon}
        text={currentOption?.label || label}
        iconSx={{ color: 'text.secondary' }}
        endContent={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              ml: 'auto',
              pl: 1,
            }}
          >
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

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ ...padding.x.xs, ...listContainerSx }}>
          {options.map((option) => {
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      onClick: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
      description: PropTypes.string,
    })
  ).isRequired,
  currentValue: PropTypes.string.isRequired,
  showCheckmark: PropTypes.bool,
  sx: PropTypes.object,
  buttonSx: PropTypes.object,
  listItemSx: PropTypes.object,
  listContainerSx: PropTypes.object,
  indentLevel: PropTypes.number,
  defaultOpen: PropTypes.bool,
};

export default Dropdown;
