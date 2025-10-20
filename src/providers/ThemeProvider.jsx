import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMuiTheme from '../hooks/useMuiTheme';
import useDocumentDirection from '../hooks/useDocumentDirection';

const ThemeProvider = ({ children }) => {
  // Get the theme using our custom hook
  const theme = useMuiTheme();
  
  // Update document direction and language
  useDocumentDirection();

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

