// external imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
// Load all font weights synchronously - they're all needed for initial render
// (buttons use 600, headings use 700/600, body uses 400)
// @fontsource already includes font-display: swap for optimal loading
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/500.css';
import '@fontsource/cairo/600.css';
import '@fontsource/cairo/700.css';
import '@i18n'; // Initialize i18n
import './index.css';

// internal imports
import App from './App.jsx';
import { ReduxProvider, QueryProvider, ThemeProvider } from '@providers';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  </StrictMode>
);
