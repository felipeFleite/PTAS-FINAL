import { useState } from 'react'
import '../css/cadastro.css'

function Cadastro() {

  return (
    <>
      <div className='table'>

        <h1>Cadastro</h1>

        <div className='dados'>

        <input type="text" placeholder='Insira seu nome'/>

        <input type="text" placeholder='Insira seu E-mail'/>

        <input type="password" placeholder='Insira sua senha'/>

        <input type="password" placeholder='Confirme sua senha'/>
      
      </div>

      <br/>
      <button>Cadastrar</button>

      </div>
    </>
  )
}

export default Cadastro
