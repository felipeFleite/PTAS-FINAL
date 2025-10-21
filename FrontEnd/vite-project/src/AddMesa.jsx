import '../css/cadastro.css'

function Reservar() {

  return (
    <>
      <div className='table'>

        <h1>Reserva</h1>

        <div className='dados'>

        <input type="number" placeholder='Número da mesa'/>

        <input type="number" placeholder='Capacidade da mesa'/>

        <input type="text" placeholder='Status da mesa'/>
      
      </div>

      <br/>
      <button>Salvar</button>
      <button>Editar/Excluir</button>

      </div>
    </>
  )
}

export default Reservar
