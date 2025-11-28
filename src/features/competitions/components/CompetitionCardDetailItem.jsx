import PropTypes from 'prop-types';
import { Stack, Typography, useTheme } from '@mui/material';
import { Icon } from '@components';

function CompetitionCardDetailItem({ icon, iconName, children, show = true }) {
  const theme = useTheme();

  if (!show) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {icon || <Icon name={iconName} size={18} color={theme.palette.text.secondary} />}
      <Typography variant="caption" color="text.secondary">
        {children}
      </Typography>
    </Stack>
  );
}

CompetitionCardDetailItem.propTypes = {
  icon: PropTypes.node,
  iconName: PropTypes.string,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
};

export default CompetitionCardDetailItem;
