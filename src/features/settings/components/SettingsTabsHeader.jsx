// external imports
import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';

function SettingsTabsHeader({ value, onChange, items }) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
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
            iconPosition="start"
            sx={{ 
              minHeight: 64,
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
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

