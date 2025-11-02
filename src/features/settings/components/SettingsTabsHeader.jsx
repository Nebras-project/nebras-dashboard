// external imports
import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { borderRadius } from '@theme';
import { margin, HEADER_HEIGHT } from '@constants';
import { fontSizes, fontWeights } from '@theme';

const getContainerStyles = () => ({
  borderBottom: borderRadius.xxs,
  borderColor: 'divider',
  ...margin.bottom.lg,
});

const getTabStyles = () => ({
  minHeight: HEADER_HEIGHT,
  textTransform: 'none',
  fontSize: fontSizes.sm,
  fontWeight: fontWeights.semiBold,
});

function SettingsTabsHeader({ value, onChange, items }) {
  return (
    <Box sx={getContainerStyles()}>
      <Tabs
        value={value}
        onChange={onChange}
        aria-label="settings tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        {items.map((item, index) => (
          <Tab
            key={index}
            label={item.label}
            icon={item.icon}
            iconPosition="end"
            sx={getTabStyles()}
          />
        ))}
      </Tabs>
    </Box>
  );
}

SettingsTabsHeader.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default SettingsTabsHeader;
