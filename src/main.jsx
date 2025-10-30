// external imports
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import '@fontsource/cairo/500.css'
import '@fontsource/cairo/400.css'
import '@fontsource/cairo/600.css'
import '@fontsource/cairo/700.css'
import '@i18n' // Initialize i18n
import './index.css'

// internal imports
import App from './App.jsx'
import {ReduxProvider, QueryProvider, ThemeProvider} from '@providers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  </StrictMode>,
)

