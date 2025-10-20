import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import useTheme from '../hooks/useTheme';

const ThemeProvider = ({ children }) => {
  // Get the theme using our custom hook
  const theme = useTheme();
  
  // Get language/direction from Redux
  const { isRTL, currentLanguage } = useSelector((state) => state.language);

  // Update HTML dir and lang attributes when language changes
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLanguage);
  }, [isRTL, currentLanguage]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;

