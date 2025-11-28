// external imports
import { Box, List, Collapse } from '@mui/material';
import { useState, useId } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { ListButton, ExpandIcon, Icon } from '@components';
import { padding, margin } from '@constants';

const getEndContentStyles = () => ({
  ...margin.left.auto,
  ...padding.left.sm,
});

const getButtonStyles = (buttonSx) => ({
  justifyContent: 'flex-start',
  ...padding.x.md,
  width: '100%',
  ...buttonSx,
});

const getListContainerStyles = (listContainerSx) => ({
  ...padding.x.xs,
  ...listContainerSx,
});

const getListItemStyles = (indentLevel, listItemSx) => ({
  pl: indentLevel,
  '&.Mui-disabled': { opacity: 0.5 },
  ...listItemSx,
});

const getIconStyles = (isSelected) => ({
  color: isSelected ? 'primary.main' : 'text.secondary',
});

const getTextProps = (isSelected) => ({
  fontWeight: isSelected ? 600 : 400,
  fontSize: '0.875rem',
});

const findCurrentOption = (options, currentValue) => {
  return options.find((opt) => opt.value === currentValue);
};

const getListItemIcon = (showCheckmark, isSelected, optionIcon) => {
  return showCheckmark && isSelected ? <Icon name="check" size={20} /> : optionIcon;
};

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
  id,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const generatedId = useId();
  const dropdownId = id || `dropdown-${generatedId}`;
  const listId = `${dropdownId}-list`;

  const currentOption = findCurrentOption(options, currentValue);

  return (
    <Box sx={sx}>
      <ListButton
        onClick={() => setIsOpen(!isOpen)}
        icon={currentOption?.icon || icon}
        text={currentOption?.label || label}
        iconSx={{ color: 'text.secondary' }}
        endContent={
          <Box sx={getEndContentStyles()}>
            <ExpandIcon isOpen={isOpen} transitionDuration="0.1s" />
          </Box>
        }
        sx={getButtonStyles(buttonSx)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={label}
      />

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={getListContainerStyles(listContainerSx)}
          id={listId}
          role="listbox"
          aria-label={`${label} options`}
        >
          {options.map((option) => {
            const isSelected = currentValue && option.value === currentValue;
            return (
              <ListButton
                key={option.value}
                onClick={() => {
                  if (option.onClick) option.onClick();
                }}
                disabled={option?.disabled}
                icon={getListItemIcon(showCheckmark, isSelected, option.icon)}
                text={option.label}
                iconSx={getIconStyles(isSelected)}
                textProps={getTextProps(isSelected)}
                sx={getListItemStyles(indentLevel, listItemSx)}
                role="option"
                aria-selected={isSelected}
                aria-label={option.label}
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
  id: PropTypes.string,
};

export default Dropdown;
