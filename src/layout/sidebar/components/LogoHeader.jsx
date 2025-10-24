import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { LuPanelRightClose, LuPanelLeftClose } from 'react-icons/lu';
import { IoClose } from "react-icons/io5";
import NebrasLogoLight from '../../../data/images/Nebras Logo Light.svg';
import NebrasLogoDark from '../../../data/images/Nebras Logo Dark.svg';
import PropTypes from 'prop-types';
import { LOGO_HEIGHT, LOGO_LETTER_SPACING } from '../../constants';
import { fontWeights } from '../../../theme/typography';
import { spacing } from '../../../theme';
import { useTranslation, useLanguage, useSidebar } from '../../../hooks';

/**
 * LogoHeader Component
 * Displays the Nebras logo and title in the sidebar with collapse toggle
 */
function LogoHeader({ mode, collapsed, onToggleCollapse }) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  

  const {isMobile, setSidebarOpen} = useSidebar();

  // Determine which icon to show based on collapsed state and direction
  const getCollapseIcon = () => {
    if (isRTL) {
      // RTL mode (Arabic): icons are reversed
      return collapsed ? <LuPanelLeftClose size={24} /> : <LuPanelRightClose size={24} />;
    } else {
      // LTR mode (English): normal icons
      return collapsed ? <LuPanelRightClose size={24} /> : <LuPanelLeftClose size={24} />;
    }
  };
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
          {t('common.brandName')}
        </Typography>
      )}
      
       {isMobile ? <IconButton size="small"
       onClick={() => setSidebarOpen(false)}
           sx={{
             ml: collapsed ? 0 : 'auto',
             bgcolor: 'background.paper',
             border: 1,
             borderColor: 'divider',
             width: 32,
             height: 32,
             '&:hover': {
               bgcolor: 'action.hover',
             },
             transition: 'all 0.3s ease',
           }}><IoClose size={20} /></IconButton> :
         <Tooltip 
        title={collapsed ? t('common.expand') : t('common.collapse')} 
        placement="right"
        arrow
      >
         <IconButton
           onClick={onToggleCollapse}
           size="small"
           sx={{
             ml: collapsed ? 0 : 'auto',}}
         >
           {getCollapseIcon()}
         </IconButton>
      </Tooltip>}
      {/* Collapse Toggle Button */}
      
    </Box>
  );
}

LogoHeader.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
  collapsed: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
};

export default LogoHeader;

