import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/cairo/400.css'
import '@fontsource/cairo/500.css'
import '@fontsource/cairo/600.css'
import '@fontsource/cairo/700.css'
import './index.css'
import App from './App.jsx'
import ReduxProvider from './providers/ReduxProvider.jsx'
import ThemeProvider from './providers/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
)

