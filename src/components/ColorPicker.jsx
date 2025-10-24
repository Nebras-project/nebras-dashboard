import { useState } from 'react';
import PropTypes from 'prop-types';
import { HexColorPicker } from 'react-colorful';
import {
  Box,
  Popover,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
  Button,
} from '@mui/material';
import { MdPalette, MdClose } from 'react-icons/md';
import { 
  getSidebarControlButtonStyles, 
  getSidebarControlIconStyles,
  getSidebarControlTextProps,
  NAV_TRANSITION,
} from '../layout/constants';
import { useTranslation, useLanguage } from '../hooks';

/**
 * Validate and format hex color
 */
const isValidHex = (color) => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

const formatHex = (value) => {
  // Remove any non-hex characters
  let hex = value.replace(/[^0-9A-Fa-f]/g, '');
  
  // Limit to 6 characters
  hex = hex.substring(0, 6);
  
  // Add # prefix
  return '#' + hex;
};

/**
 * Color Picker Component
 * Allows users to select a custom color
 */
function ColorPicker({ currentColor, onColorChange, scheme }) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempColor, setTempColor] = useState(currentColor);
  const [inputValue, setInputValue] = useState(currentColor);

  const buttonStyles = getSidebarControlButtonStyles();
  const iconStyles = getSidebarControlIconStyles();
  const textProps = getSidebarControlTextProps();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTempColor(currentColor);
    setInputValue(currentColor);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color) => {
    setTempColor(color);
    setInputValue(color);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Only update color if it's a valid hex
    const formatted = formatHex(value);
    if (isValidHex(formatted)) {
      setTempColor(formatted);
    }
  };

  const handleApply = () => {
    // Only apply if valid hex color
    if (isValidHex(tempColor)) {
      onColorChange(tempColor);
      handleClose();
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={buttonStyles}
      >
        <ListItemIcon sx={{ 
          ...iconStyles,
          color: 'text.secondary',
        }}>
          <MdPalette />
        </ListItemIcon>
        <ListItemText
          primary={scheme === 'custom' ? t('common.currentColor') : t('common.pichAColor')}
          primaryTypographyProps={textProps}
        />
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: 1,
            bgcolor: scheme === 'custom' ? currentColor : 'action.hover',
            border: 2,
            borderColor: 'divider',
            ml: 1,
            flexShrink: 0,
            transition: NAV_TRANSITION,
          }}
        />
      </ListItemButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: isRTL ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: isRTL ? 'right' : 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box sx={{ fontWeight: 600, fontSize: '1rem' }}>{t('common.theme')}</Box>
              <IconButton size="small" onClick={handleClose}>
                <MdClose />
              </IconButton>
            </Stack>

            {/* Color Picker */}
            <HexColorPicker color={tempColor} onChange={handleColorChange} />

            {/* Color Preview & Input */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  bgcolor: tempColor,
                  border: 2,
                  borderColor: 'divider',
                  flexShrink: 0,
                }}
              />
              <Box
                component="input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="#000000"
                sx={{
                  flex: 1,
                  p: 1,
                  borderRadius: 1,
                  border: 1,
                  borderColor: isValidHex(inputValue) ? 'divider' : 'error.main',
                  bgcolor: 'background.default',
                  color: 'text.primary',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  '&:focus': {
                    outline: 'none',
                    borderColor: isValidHex(inputValue) ? 'primary.main' : 'error.main',
                  },
                }}
              />
            </Stack>

            {/* Validation Message */}
            {!isValidHex(inputValue) && (
              <Box sx={{ fontSize: '0.75rem', color: 'error.main', textAlign: 'center' }}>
                {t('forms.invalidFormat')}
              </Box>
            )}

            {/* Action Buttons */}
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                onClick={handleClose}
              >
                {t('common.cancel')}
              </Button>
              <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={handleApply}
                disabled={!isValidHex(tempColor)}
              >
                {t('common.save')}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}

ColorPicker.propTypes = {
  currentColor: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
  scheme: PropTypes.string.isRequired,
};

export default ColorPicker;
