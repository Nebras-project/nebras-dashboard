import { Paper, Typography } from '@mui/material';
import { useTranslation } from '@hooks';

function SecurityCard() {
  const { t } = useTranslation();
  return (
    <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
      <Typography variant="overline" color="warning.main" sx={{ fontWeight: 700, letterSpacing: 1.5, display: 'block', mb: 1.5 }}>
        {t('settings.securitySettings')}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.7, fontWeight: 500 }}>
        {t('settings.changePasswordDescription')}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5, fontStyle: 'italic' }}>
        Last changed: Never
      </Typography>
    </Paper>
  );
}

export default SecurityCard;


