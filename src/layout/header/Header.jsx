import { AppBar, Toolbar } from '@mui/material';
import { useUser } from '../../hooks';
import UserInfo from './components/UserInfo';

/**
 * Header Component
 * Unified header displaying user information
 */
function Header() {
  const { user } = useUser();

  return (
    <AppBar 
      position="fixed"
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        top: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar>
        <UserInfo user={user} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;

