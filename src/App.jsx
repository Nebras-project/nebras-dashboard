import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Typography, Stack } from '@mui/material';
import { MdMenu, MdLogout, MdDarkMode, MdLightMode, MdLanguage } from 'react-icons/md';
import { useLanguage, useReduxTheme, useUser } from './hooks';
import routes from './config/routes';

// Simple Header Component (temporary until we build full layout in next phase)
function AppHeader() {
  const { mode, toggleTheme } = useReduxTheme();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const { user, logout } = useUser();
  const location = useLocation();

  // Don't show header on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <MdMenu />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Nebras Dashboard
        </Typography>

        {/* Theme Controls */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Language Toggle */}
          <IconButton color="inherit" onClick={toggleLanguage} title="Toggle Language">
            <MdLanguage />
            <Typography variant="caption" sx={{ ml: 0.5 }}>
              {currentLanguage.toUpperCase()}
            </Typography>
          </IconButton>

          {/* Theme Toggle */}
          <IconButton color="inherit" onClick={toggleTheme} title="Toggle Theme">
            {mode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
          </IconButton>

          {/* User Info & Logout */}
          {user && (
            <>
              <Typography variant="body2" sx={{ mx: 2, display: { xs: 'none', sm: 'block' } }}>
                {user.name}
              </Typography>
              <IconButton color="inherit" onClick={logout} title="Logout">
                <MdLogout />
              </IconButton>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppHeader />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
