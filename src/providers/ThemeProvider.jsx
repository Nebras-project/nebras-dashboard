import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useMuiTheme} from '../hooks/useMuiTheme';
import {useDocumentDirection} from '../hooks/useDocumentDirection';
import {useCssVariables} from '../hooks/useCssVariables';

const ThemeProvider = ({ children }) => {
  // Get the theme using our custom hook
  const theme = useMuiTheme();
  
  // Update document direction and language
  useDocumentDirection();
  
  // Set CSS custom properties based on theme
  useCssVariables(theme);

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

