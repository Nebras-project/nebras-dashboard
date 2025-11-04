import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { useMuiTheme, useDocumentDirection, useCssVariables, useLanguage } from '@hooks';
import { useMemo, memo } from 'react';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create LTR cache
const cacheLtr = createCache({
  key: 'muiltr',
});

const ThemeProvider = memo(function ThemeProvider({ children }) {
  // Get the theme using our custom hook
  const theme = useMuiTheme();

  // Get language direction
  const { isRTL } = useLanguage();

  // Update document direction and language
  useDocumentDirection();

  // Set CSS custom properties based on theme
  useCssVariables(theme);

  // Select the appropriate cache based on direction
  const cache = useMemo(() => {
    return isRTL ? cacheRtl : cacheLtr;
  }, [isRTL]);

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
});

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
