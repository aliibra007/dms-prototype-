import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import './styles/globals.css'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import 'react-day-picker/dist/style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <MantineProvider defaultColorScheme="light">
          <App />
        </MantineProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)

