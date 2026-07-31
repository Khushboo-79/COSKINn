import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
// @ts-ignore
import App from './frontend/src/App'
// @ts-ignore
import { ThemeProvider } from './frontend/src/context/ThemeContext'
import './frontend/src/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
