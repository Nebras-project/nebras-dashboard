// external imports
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Popover, Stack } from '@mui/material';

// internal imports
import { COLOR_INDICATOR_SIZE, padding, margin } from '@constants';
import { useTranslation, useLanguage } from '@hooks';
import { ListButton, ColorSwatch, Icon, CloseButton } from '@components';
import { borderRadius, fontWeights, baseColors } from '@theme';

// Fixed color palette
const FIXED_COLORS = [
  baseColors.colorPickerColors.blue,
  baseColors.colorPickerColors.red,
  baseColors.colorPickerColors.green,
  baseColors.colorPickerColors.pink,
  baseColors.colorPickerColors.orange,
  baseColors.colorPickerColors.purple,
];

const getPopoverContentStyles = () => ({
  ...padding.all.md,
});

const getHeaderStyles = () => ({
  fontWeight: fontWeights.semiBold,
  fontSize: '1rem',
});

const getColorSwatchStyles = () => ({
  ...margin.left.sm,
});

const getColorsGridStyles = () => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 1,
  width: '100%',
});

const getColorButtonStyles = (color, isSelected) => ({
  width: '100%',
  aspectRatio: '1',
  minWidth: 64,
  minHeight: 64,
  bgcolor: color,
  borderRadius: borderRadius.md,
  border: `3px solid ${isSelected ? 'primary.main' : 'transparent'}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: 3,
  },
  '&:focus': {
    outline: 'none',
    borderColor: 'primary.main',
  },
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (color) => {
    onColorChange(color);
    handleClose();
  };

  const open = Boolean(anchorEl);

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
        role="dialog"
        aria-modal="true"
        aria-label={t('common.colorPicker')}
      >
        <Box sx={getPopoverContentStyles()}>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box sx={getHeaderStyles()}>{t('common.theme')}</Box>
              <CloseButton onClick={handleClose} size="small" />
            </Stack>

            <Box sx={getColorsGridStyles()}>
              {FIXED_COLORS.map((color) => (
                <Box
                  key={color}
                  component="button"
                  onClick={() => handleColorSelect(color)}
                  sx={getColorButtonStyles(color, currentColor === color)}
                  aria-label={color}
                  aria-pressed={currentColor === color}
                  title={color}
                />
              ))}
            </Box>
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
