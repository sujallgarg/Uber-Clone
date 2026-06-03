import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import RideProvider from './context/RideContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <RideProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RideProvider>
    </UserContext>
  </StrictMode>,
)
