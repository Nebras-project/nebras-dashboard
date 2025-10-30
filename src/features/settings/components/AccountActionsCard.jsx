import { Paper, Typography } from '@mui/material';
import { useTranslation } from '@hooks';

function AccountActionsCard() {
  const { t } = useTranslation();
  return (
    <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
      <Typography variant="overline" color="error.main" sx={{ fontWeight: 700, letterSpacing: 1.5, display: 'block', mb: 1.5 }}>
        {t('settings.accountActions')}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.7, fontWeight: 500 }}>
        {t('settings.logoutDescription')}
      </Typography>
    </Paper>
  );
}

export default AccountActionsCard;


