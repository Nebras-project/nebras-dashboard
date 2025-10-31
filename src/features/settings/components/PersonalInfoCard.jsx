// external imports
import { Box, Typography, Stack, Divider } from '@mui/material';
import { MdPerson, MdEmail, MdPhone } from 'react-icons/md';

// internal imports
import { Card } from '@components';
import { useTranslation, useUser } from '@hooks';
import { baseColors, borderRadius, fontWeights } from '@theme';
import { spacing, gap, margin } from '@constants';

function PersonalInfoCard() {
  const { t } = useTranslation();
  const { user } = useUser();

  const infoItems = [
    {
      icon: <MdPerson size={20} />,
      label: t('common.name'),
      value: user?.name || '-',
      color: baseColors.blue700,
    },
    {
      icon: <MdEmail size={20} />,
      label: t('common.email'),
      value: user?.email || '-',
      color: baseColors.pink200,
    },
    {
      icon: <MdPhone size={20} />,
      label: t('common.phone'),
      value: user?.phone || '-',
      color: baseColors.green400,
    },
  ];

  return (
    <Card
      title={t('settings.personalInformation')}
      titleTypographyProps={{
        variant: 'overline',
        color: 'primary.main',
        sx: { fontWeight: 700, letterSpacing: 1.5 },
      }}
      hoverable
    >
      <Stack spacing={spacing.values.lg}>
        {infoItems.map((item, index) => (
          <Box key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', ...gap.md }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: borderRadius.xs,
                  bgcolor: `${item.color}15`,
                  color: item.color,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: fontWeights.semiBold,
                    display: 'block',
                    ...margin.bottom.xxs,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={fontWeights.medium}
                  sx={{
                    wordBreak: item.label === t('common.email') ? 'break-all' : 'normal',
                    color: 'text.primary',
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>
            {index < infoItems.length - 1 && <Divider sx={{ ...margin.top.md }} />}
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

export default PersonalInfoCard;
