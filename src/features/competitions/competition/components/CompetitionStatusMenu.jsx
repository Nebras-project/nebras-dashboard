import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { Dropdown } from '@components';
import { Icon } from '@components';
import useTranslation from '@i18n/hooks/useTranslation';

function CompetitionStatusMenu({ competition, onStatusChange }) {
  const { t } = useTranslation();

  const getCurrentStatus = () => {
    const status = competition.preparationStatus?.toLowerCase();
    if (status === 'نشطة' || status === 'active') return 'active';
    if (status === 'منتهية' || status === 'completed') return 'completed';
    if (status === 'مغلقة' || status === 'closed') return 'closed';
    return 'in_preparation';
  };

  const currentStatus = getCurrentStatus();

  const statusOptions = [
    {
      value: 'active',
      label: t('competitions.activateCompetition'),
      icon: <Icon name="taskAlt" size={18} />,
      onClick: () => onStatusChange?.('active'),
      disabled: currentStatus === 'active',
    },
    {
      value: 'completed',
      label: t('competitions.completeCompetition'),
      icon: <Icon name="calendarCheck" size={18} />,
      onClick: () => onStatusChange?.('completed'),
      disabled: currentStatus === 'completed',
    },
    {
      value: 'closed',
      label: t('competitions.closeCompetition'),
      icon: <Icon name="lock" size={18} />,
      onClick: () => onStatusChange?.('closed'),
      disabled: currentStatus === 'closed',
    },
  ];

  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Box onClick={handleClick} sx={{ width: '100%' }}>
      <Dropdown
        icon={<Icon name="swapHoriz" size={18} />}
        label={t('competitions.changeStatus')}
        options={statusOptions}
        currentValue={currentStatus}
        showCheckmark={true}
        buttonSx={{
          '&:hover': {
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important',
          },
          padding: 0,
          margin: 0,
        }}
      />
    </Box>
  );
}

CompetitionStatusMenu.propTypes = {
  competition: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func,
};

export default CompetitionStatusMenu;
