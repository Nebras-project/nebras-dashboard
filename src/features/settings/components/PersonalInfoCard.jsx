import { Box, Paper, Typography, Stack, Divider } from '@mui/material';
import { MdPerson, MdEmail, MdPhone } from 'react-icons/md';
import { useTranslation, useUser } from '@hooks';
import { baseColors } from '../../../theme/colors';

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
    <Paper elevation={0} sx={{ p: 4, border: 1, borderColor: 'divider', borderRadius: 2 }}>
      <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 1.5, display: 'block', mb: 3 }}>
        {t('settings.personalInformation')}
      </Typography>
      <Stack spacing={3}>
        {infoItems.map((item, index) => (
          <Box key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: 2,
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
                    fontWeight: 700,
                    letterSpacing: 1,
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="600"
                  sx={{
                    wordBreak: item.label === t('common.email') ? 'break-all' : 'normal',
                    color: 'text.primary',
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>
            {index < infoItems.length - 1 && <Divider sx={{ mt: 3 }} />}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

export default PersonalInfoCard;


