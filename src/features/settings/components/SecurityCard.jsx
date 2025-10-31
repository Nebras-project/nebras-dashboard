// external imports
import { Typography } from '@mui/material';

// internal imports
import { Card } from '@components';
import { padding, margin } from '@constants';
import { useTranslation } from '@hooks';
import { fontWeights } from '@theme';

function SecurityCard() {
  const { t } = useTranslation();
  return (
    <Card
      title={t('settings.securitySettings')}
      hoverable
      titleTypographyProps={{
        variant: 'overline',
        color: 'warning.main',
        sx: { fontWeight: fontWeights.semiBold },
      }}
      contentSx={{ ...padding.top.none }}
    >
      <Typography variant="body2" color="text.primary">
        {t('settings.changePasswordDescription')}
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', ...margin.top.sm, fontStyle: 'italic' }}
      >
        {t('settings.lastChanged')}
      </Typography>
    </Card>
  );
}

export default SecurityCard;
