import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/**
 * The root file for the React application that initializes and renders the App component.
 * 
 * Similar to `index.tsx` but serves as an alternative entry point.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
