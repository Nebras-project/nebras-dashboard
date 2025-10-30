import { useState } from 'react';
import PropTypes from 'prop-types';
import { HexColorPicker } from 'react-colorful';
import {
  Box,
  Popover,
  IconButton,
  Stack,
  Button,
} from '@mui/material';
import {  MdClose } from 'react-icons/md';
import { TbPalette } from "react-icons/tb";
import { NAV_TRANSITION } from '@constants';
import { useTranslation, useLanguage } from '@hooks';
import { ListButton } from '@components';
import ColorSwatch from '../display/ColorSwatch';
import { COLOR_INDICATOR_SIZE } from '../../constants/layout';

const isValidHex = (color) => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

const formatHex = (value) => {
  let hex = value.replace(/[^0-9A-Fa-f]/g, '');
  hex = hex.substring(0, 6);
  return '#' + hex;
};

function ColorPicker({ currentColor, onColorChange, scheme }) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempColor, setTempColor] = useState(currentColor);
  const [inputValue, setInputValue] = useState(currentColor);

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
    const formatted = formatHex(value);
    if (isValidHex(formatted)) {
      setTempColor(formatted);
    }
  };

  const handleApply = () => {
    if (isValidHex(tempColor)) {
      onColorChange(tempColor);
      handleClose();
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <ListButton
        onClick={handleClick}
        icon={<TbPalette />}
        text={scheme === 'custom' ? t('common.currentColor') : t('common.pichAColor')}
        endContent={
          <ColorSwatch
            color={scheme === 'custom' ? currentColor : 'action.hover'}
            size={COLOR_INDICATOR_SIZE}
            sx={{
              ml: 1,
              transition: NAV_TRANSITION,
            }}
          />
        }
        iconSx={{ color: 'text.secondary' }}
      />

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
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box sx={{ fontWeight: 600, fontSize: '1rem' }}>{t('common.theme')}</Box>
              <IconButton size="small" onClick={handleClose}>
                <MdClose />
              </IconButton>
            </Stack>

            <HexColorPicker color={tempColor} onChange={handleColorChange} />

            <Stack direction="row" spacing={1} alignItems="center">
              <ColorSwatch
                color={tempColor}
                size={COLOR_INDICATOR_SIZE}
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

            {!isValidHex(inputValue) && (
              <Box sx={{ fontSize: '0.75rem', color: 'error.main', textAlign: 'center' }}>
                {t('forms.invalidFormat')}
              </Box>
            )}

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


