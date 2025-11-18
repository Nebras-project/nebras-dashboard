// external imports
import { useCallback, useMemo } from 'react';
import { Box } from '@mui/material';

// internal imports
import { ListButton, ColorPicker, ColorSwatch, Card, Icon } from '@components';
import { useTranslation, useColorScheme } from '@hooks';
import { COLOR_INDICATOR_SIZE, margin } from '@constants';
import { baseColors } from '@theme';

const DEFAULT_COLOR = baseColors.teal500;

const getContainerStyles = () => ({
  minWidth: 280,
});

const getDefaultColorButtonStyles = () => ({
  ...margin.bottom.sm,
});

const getIconStyles = () => ({
  color: 'text.secondary',
});

function ColorSettingsCard() {
  const { t } = useTranslation();
  const { scheme, customColor, setCustomColor, setColorScheme } = useColorScheme();

  const handleDefaultColor = useCallback(() => {
    // Avoid state update if scheme hasn't changed
    if (scheme === 'default') return;

    setColorScheme('default');
  }, [scheme, setColorScheme]);

  const handleCustomColorChange = useCallback(
    (color) => {
      setCustomColor(color);
    },
    [setCustomColor]
  );

  const actions = useMemo(
    () => (
      <Box sx={getContainerStyles()}>
        <Box sx={getDefaultColorButtonStyles()}>
          <ListButton
            onClick={handleDefaultColor}
            icon={<Icon name="colorBucket" />}
            text={t('common.defaultColor')}
            endContent={<ColorSwatch color={DEFAULT_COLOR} size={COLOR_INDICATOR_SIZE} />}
            iconSx={getIconStyles()}
          />
        </Box>
        <ColorPicker
          currentColor={customColor}
          onColorChange={handleCustomColorChange}
          scheme={scheme}
        />
      </Box>
    ),
    [handleDefaultColor, handleCustomColorChange, customColor, scheme, t]
  );

  return (
    <Card
      title={t('settings.chooseMainColor')}
      subheader={t('settings.colorDescription')}
      actions={actions}
      sx={{ backgroundColor: 'background.paper' }}
    />
  );
}

export default ColorSettingsCard;
