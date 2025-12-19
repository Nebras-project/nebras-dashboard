// external imports
import { Box, Typography, Stack, Divider } from '@mui/material';

// internal imports
import { Card, Icon } from '@components';
import { useTranslation, useAuth } from '@hooks';
import { baseColors, borderRadius, fontWeights } from '@theme';
import { spacing, gap, margin } from '@constants';

const getTitleStyles = () => ({
  fontWeight: 700,
  letterSpacing: 1.5,
});

const getItemContainerStyles = () => ({
  display: 'flex',
  alignItems: 'center',
  ...gap.md,
});

const getIconContainerStyles = (color) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: borderRadius.xs,
  bgcolor: `${color}15`,
  color,
  flexShrink: 0,
});

const getInfoWrapperStyles = () => ({
  flex: 1,
  minWidth: 0,
});

const getLabelStyles = () => ({
  textTransform: 'uppercase',
  fontWeight: fontWeights.semiBold,
  display: 'block',
  ...margin.bottom.xxs,
});

const getValueStyles = (isEmail) => ({
  wordBreak: isEmail ? 'break-all' : 'normal',
  color: 'text.primary',
});

const getDividerStyles = () => ({
  ...margin.top.md,
});

function PersonalInfoCard() {
  const { t } = useTranslation();
  const { userName, email } = useAuth();

  const infoItems = [
    {
      icon: <Icon name="person" size={20} />,
      label: t('common.name'),
      value: userName || '-',
      color: baseColors.blue700,
    },
    {
      icon: <Icon name="email" size={20} />,
      label: t('common.email'),
      value: email || '-',
      color: baseColors.pink200,
    },
    {
      icon: <Icon name="phone" size={20} />,
      label: t('common.phone'),
      value: '-',
      color: baseColors.green400,
    },
  ];

  return (
    <Card
      title={t('settings.personalInformation')}
      titleTypographyProps={{
        variant: 'overline',
        color: 'primary.main',
        sx: getTitleStyles(),
      }}
      sx={{ backgroundColor: 'background.paper' }}
    >
      <Stack spacing={spacing.values.lg}>
        {infoItems.map((item, index) => (
          <Box key={index}>
            <Box sx={getItemContainerStyles()}>
              <Box sx={getIconContainerStyles(item.color)}>{item.icon}</Box>
              <Box sx={getInfoWrapperStyles()}>
                <Typography variant="caption" color="text.secondary" sx={getLabelStyles()}>
                  {item.label}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={fontWeights.medium}
                  sx={getValueStyles(item.label === t('common.email'))}
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>
            {index < infoItems.length - 1 && <Divider sx={getDividerStyles()} />}
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

export default PersonalInfoCard;
