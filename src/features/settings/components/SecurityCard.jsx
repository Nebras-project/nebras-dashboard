// external imports
import { Typography } from '@mui/material';

// internal imports
import { Card } from '@components';
import { padding, margin } from '@constants';
import { useTranslation } from '@hooks';
import { fontWeights } from '@theme';

const getTitleStyles = () => ({
  fontWeight: fontWeights.semiBold,
});

const getContentStyles = () => ({
  ...padding.top.none,
});

const getLastChangedStyles = () => ({
  display: 'block',
  ...margin.top.sm,
  fontStyle: 'italic',
});

function SecurityCard() {
  const { t } = useTranslation();
  return (
    <Card
      title={t('settings.securitySettings')}
      sx={{ backgroundColor: 'background.paper' }}
      titleTypographyProps={{
        variant: 'overline',
        color: 'warning.main',
        sx: getTitleStyles(),
      }}
      contentSx={getContentStyles()}
    >
      <Typography variant="body2" color="text.primary">
        {t('settings.changePasswordDescription')}
      </Typography>

      <Typography variant="caption" color="text.secondary" sx={getLastChangedStyles()}>
        {t('settings.lastChanged')}
      </Typography>
    </Card>
  );
}

export default SecurityCard;
