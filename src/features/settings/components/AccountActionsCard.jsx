// external imports
import { Typography } from '@mui/material';

// internal imports
import { Card } from '@components';
import { padding } from '@constants';
import { fontWeights } from '@theme';
import { useTranslation } from '@hooks';

const getTitleStyles = () => ({
  fontWeight: fontWeights.semiBold,
});

const getContentStyles = () => ({
  ...padding.top.none,
});

const getDescriptionStyles = () => ({
  fontWeight: fontWeights.medium,
});

function AccountActionsCard() {
  const { t } = useTranslation();
  return (
    <Card
      hoverable
      title={t('settings.accountActions')}
      titleTypographyProps={{
        variant: 'overline',
        color: 'error.main',
        sx: getTitleStyles(),
      }}
      contentSx={getContentStyles()}
    >
      <Typography variant="body2" color="text.primary" sx={getDescriptionStyles()}>
        {t('settings.logoutDescription')}
      </Typography>
    </Card>
  );
}

export default AccountActionsCard;
