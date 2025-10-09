import { useState } from 'react'
import '../css/login.css'

function Login() {

  return (
    <>
      <div>
        
        <h1>Log-in</h1>

        <input type="text" placeholder='Insira seu E-mail'/>

        <input type="text" placeholder='Insira sua senha'/>
      
      <button>Logar</button>

      </div>
    </>
  )
}

export default Login
