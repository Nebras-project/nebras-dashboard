import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import NebrasLogoLight from '../../../data/images/Nebras Logo Light.svg';
import NebrasLogoDark from '../../../data/images/Nebras Logo Dark.svg';
import PropTypes from 'prop-types';
import { LOGO_HEIGHT, LOGO_LETTER_SPACING, BRAND_NAME } from '../../constants';
import { fontWeights } from '../../../theme/typography';
import { spacing } from '../../../theme';

/**
 * LogoHeader Component
 * Displays the Nebras logo and title in the sidebar with collapse toggle
 */
function LogoHeader({ mode, collapsed, onToggleCollapse }) {
  return (
    <Box 
      sx={{ 
        px: spacing.md / 8, // 16px / 8 = 2 units
        py: spacing.md / 8, // 16px / 8 = 2 units
        display: 'flex', 
        flexDirection: collapsed ? 'column' : 'row',
        alignItems: 'center', 
        gap: collapsed ? 2 : (spacing.xs + spacing.sm) / 8, // (4px + 8px) / 8 = 1.5 units
        position: 'relative',
      }}
    >
      <Box 
        component="img"
        src={mode === 'light' ? NebrasLogoDark : NebrasLogoLight}
        alt="Nebras Logo"
        sx={{ 
          height: LOGO_HEIGHT,
          flexShrink: 0,
        }}
      />
      {!collapsed && (
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: fontWeights.bold,
            whiteSpace: 'nowrap',
            letterSpacing: LOGO_LETTER_SPACING,
          }}
        >
          {BRAND_NAME}
        </Typography>
      )}
      
      {/* Collapse Toggle Button */}
      <Tooltip 
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"} 
        placement="right"
        arrow
      >
        <IconButton
          onClick={onToggleCollapse}
          size="small"
          sx={{
            ml: collapsed ? 0 : 'auto',
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            width: 28,
            height: 28,
            '&:hover': {
              bgcolor: 'action.hover',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {collapsed ? <MdChevronRight size={18} /> : <MdChevronLeft size={18} />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

LogoHeader.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
  collapsed: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
};

export default LogoHeader;

