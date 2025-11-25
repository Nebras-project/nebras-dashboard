import { ListItemButton, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon } from '@components';
import { customBackgrounds, textColors, borderColors } from '@theme/colors';
import { borderRadius } from '@theme/components';
import { fontWeights } from '@theme/typography';
import { padding, margin, gap } from '@constants/spacing';

const getListItemButtonStyles = (mode) => ({
  borderRadius: borderRadius.xxs,
  ...margin.bottom.xs,
  ...padding.right.md,
  '&.Mui-selected': getSelectedStyles(mode),
});

const getSelectedStyles = (mode) => ({
  bgcolor: customBackgrounds[mode].surface.level2,
  color: textColors[mode].primary,
  border: `1px solid ${borderColors[mode]}`,
  '&:hover': {
    bgcolor: customBackgrounds[mode].surface.level3,
  },
  '& .MuiTypography-root': {
    color: textColors[mode].primary,
  },
});

const getStatsContainerStyles = () => ({
  display: 'flex',
  ...gap.md,
  alignItems: 'center',
});

const getStatItemStyles = () => ({
  display: 'flex',
  alignItems: 'center',
  ...gap.xs,
});

function SubjectListItemButton({
  subjectName,
  unitsCount,
  lessonsCount,
  isSelected,
  onSelect,
  mode,
  unitsLabel,
  lessonsLabel,
}) {
  return (
    <ListItemButton selected={isSelected} onClick={onSelect} sx={getListItemButtonStyles(mode)}>
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="subtitle1"
          fontWeight={isSelected ? fontWeights.semiBold : fontWeights.medium}
          sx={margin.bottom.xs}
        >
          {subjectName}
        </Typography>

        <Box sx={getStatsContainerStyles()}>
          <SubjectStat icon="libraryBooks" value={unitsCount} label={unitsLabel} />
          <SubjectStat icon="book" value={lessonsCount} label={lessonsLabel} />
        </Box>
      </Box>
    </ListItemButton>
  );
}

function SubjectStat({ icon, value, label }) {
  return (
    <Box sx={getStatItemStyles()}>
      <Icon name={icon} size={16} />
      <Typography variant="caption">
        {value} {label}
      </Typography>
    </Box>
  );
}

SubjectStat.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

SubjectListItemButton.propTypes = {
  subjectName: PropTypes.string.isRequired,
  unitsCount: PropTypes.number.isRequired,
  lessonsCount: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
  unitsLabel: PropTypes.string.isRequired,
  lessonsLabel: PropTypes.string.isRequired,
};

export default SubjectListItemButton;
