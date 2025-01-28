import './App.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './assets/components/page_map.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)