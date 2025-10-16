import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/index.css'
import Cadastro from './Cadastro.jsx'
import Login from './Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
