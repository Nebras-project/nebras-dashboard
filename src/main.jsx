import './index.css'
import '@fontsource/cairo/400.css'
import '@fontsource/cairo/500.css'
import '@fontsource/cairo/600.css'
import '@fontsource/cairo/700.css'
import './i18n' // Initialize i18n
import App from './App.jsx'
import ReduxProvider from './providers/ReduxProvider.jsx'
import ThemeProvider from './providers/ThemeProvider.jsx'
import QueryProvider from './providers/QueryProvider.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'




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

