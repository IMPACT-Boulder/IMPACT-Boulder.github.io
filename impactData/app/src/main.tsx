/**
 * Main entry point for the IMPACT Data application.
 * This file sets up the React root and renders the main App component.
 * @module
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)