import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './route'
import { ErrorBoundary } from './components'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
