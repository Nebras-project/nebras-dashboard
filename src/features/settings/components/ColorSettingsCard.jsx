// external imports
import { Box } from '@mui/material';
import { CgColorBucket } from 'react-icons/cg';

// internal imports
import { ListButton, ColorPicker, ColorSwatch, Card } from '@components';
import { useTranslation, useColorScheme } from '@hooks';
import { COLOR_INDICATOR_SIZE } from '@constants';
import { baseColors } from '@theme';
import { margin } from '@constants';

// constants
const DEFAULT_COLOR = baseColors.teal500;

function ColorSettingsCard() {
  const { t } = useTranslation();
  const { scheme, customColor, setCustomColor, setColorScheme } = useColorScheme();

  const actions = (
    <Box
      sx={{
        minWidth: 280,
      }}
    >
      <Box sx={{ ...margin.bottom.sm }}>
        <ListButton
          onClick={() => setColorScheme('default')}
          icon={<CgColorBucket />}
          text={t('common.defaultColor')}
          endContent={<ColorSwatch color={DEFAULT_COLOR} size={COLOR_INDICATOR_SIZE} />}
          iconSx={{ color: 'text.secondary' }}
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
