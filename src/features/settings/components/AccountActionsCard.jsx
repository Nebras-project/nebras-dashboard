// external imports
import { Typography } from '@mui/material';

// internal imports
import { Card } from '@components';
import { padding } from '@constants';
import { fontWeights } from '@theme';
import { useTranslation } from '@hooks';

function AccountActionsCard() {
  const { t } = useTranslation();
  return (
    <Card
      hoverable
      title={t('settings.accountActions')}
      titleTypographyProps={{
        variant: 'overline',
        color: 'error.main',
        sx: { fontWeight: fontWeights.semiBold },
      }}
      contentSx={{ ...padding.top.none }}
    >
      <Typography variant="body2" color="text.primary" sx={{ fontWeight: fontWeights.medium }}>
        {t('settings.logoutDescription')}
      </Typography>
    </Card>
  );
}

export default AccountActionsCard;
