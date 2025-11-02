import { Card, CardContent, Stack, Box, Typography } from '@mui/material';
import { Icon } from '@components';

function StatCard({ title, value, icon, color = 'primary', trend }) {
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-4px)' },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Icon Box */}
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: `${color}.main`,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={icon} size={28} />
          </Box>

          {/* Value & Title */}
          <Box>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography variant="h4" fontWeight="bold">
                {value}
              </Typography>
              {trend && (
                <Typography
                  variant="caption"
                  color={trend > 0 ? 'success.main' : 'error.main'}
                  fontWeight="medium"
                >
                  {trend > 0 ? `+${trend}` : trend}%
                </Typography>
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default StatCard;
