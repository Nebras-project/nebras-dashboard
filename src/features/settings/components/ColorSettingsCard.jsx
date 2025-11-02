// external imports
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

  const actions = (
    <Box sx={getContainerStyles()}>
      <Box sx={getDefaultColorButtonStyles()}>
        <ListButton
          onClick={() => setColorScheme('default')}
          icon={<Icon name="colorBucket" />}
          text={t('common.defaultColor')}
          endContent={<ColorSwatch color={DEFAULT_COLOR} size={COLOR_INDICATOR_SIZE} />}
          iconSx={getIconStyles()}
        />
      </Box>
      <ColorPicker currentColor={customColor} onColorChange={setCustomColor} scheme={scheme} />
    </Box>
  );

  return (
    <Card
      title={t('settings.chooseMainColor')}
      subheader={t('settings.colorDescription')}
      actions={actions}
      hoverable
    />
  );
}

export default ColorSettingsCard;
