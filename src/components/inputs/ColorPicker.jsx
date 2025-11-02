// external imports
import { useState } from 'react';
import PropTypes from 'prop-types';
import { HexColorPicker } from 'react-colorful';
import { Box, Popover, IconButton, Stack, Button } from '@mui/material';

// internal imports
import { NAV_TRANSITION, COLOR_INDICATOR_SIZE, padding, margin } from '@constants';
import { useTranslation, useLanguage } from '@hooks';
import { ListButton, ColorSwatch, Icon } from '@components';
import { borderRadius, fontWeights, borderWidth } from '@theme';

const isValidHex = (color) => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

const formatHex = (value) => {
  let hex = value.replace(/[^0-9A-Fa-f]/g, '');
  hex = hex.substring(0, 6);
  return '#' + hex;
};

const getPopoverContentStyles = () => ({
  ...padding.all.md,
});

const getHeaderStyles = () => ({
  fontWeight: fontWeights.semiBold,
  fontSize: '1rem',
});

const getColorSwatchStyles = () => ({
  ...margin.left.sm,
  transition: NAV_TRANSITION,
});

const getInputStyles = (isValid) => ({
  flex: 1,
  ...padding.all.sm,
  borderRadius: borderRadius.xs,
  border: borderWidth.xs,
  borderColor: isValid ? 'divider' : 'error.main',
  bgcolor: 'background.default',
  color: 'text.primary',
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  '&:focus': {
    outline: 'none',
    borderColor: isValid ? 'primary.main' : 'error.main',
  },
});

const getErrorStyles = () => ({
  fontSize: '0.75rem',
  color: 'error.main',
  textAlign: 'center',
});

const getAnchorOrigin = (isRTL) => ({
  vertical: 'center',
  horizontal: isRTL ? 'left' : 'right',
});

const getTransformOrigin = (isRTL) => ({
  vertical: 'center',
  horizontal: isRTL ? 'right' : 'left',
});

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
  const isInputValid = isValidHex(inputValue);

  return (
    <>
      <ListButton
        onClick={handleClick}
        icon={<Icon name="palette" />}
        text={scheme === 'custom' ? t('common.currentColor') : t('common.pichAColor')}
        endContent={
          <ColorSwatch
            color={scheme === 'custom' ? currentColor : 'action.hover'}
            size={COLOR_INDICATOR_SIZE}
            sx={getColorSwatchStyles()}
          />
        }
        iconSx={{ color: 'text.secondary' }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={getAnchorOrigin(isRTL)}
        transformOrigin={getTransformOrigin(isRTL)}
      >
        <Box sx={getPopoverContentStyles()}>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box sx={getHeaderStyles()}>{t('common.theme')}</Box>
              <IconButton size="small" onClick={handleClose}>
                <Icon name="close" />
              </IconButton>
            </Stack>

            <HexColorPicker color={tempColor} onChange={handleColorChange} />

            <Stack direction="row" spacing={1} alignItems="center">
              <ColorSwatch color={tempColor} size={COLOR_INDICATOR_SIZE} />
              <Box
                component="input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="#000000"
                sx={getInputStyles(isInputValid)}
              />
            </Stack>

            {!isInputValid && <Box sx={getErrorStyles()}>{t('forms.invalidFormat')}</Box>}

            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" fullWidth onClick={handleClose}>
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
