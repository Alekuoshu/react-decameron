import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { UserProvider } from './context/UserProvider'

// este archivo es el punto de partida de la aplicación, se encarga de montar
// el router en el div con id "root" y envuelve al router en un Provider de
// contexto que se encarga de manejar el estado de autenticación de los usuarios
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
