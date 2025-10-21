import '../css/cadastro.css'

function Reservar() {

  return (
    <>
      <div className='table'>

        <h1>Reserva</h1>

        <div className='dados'>

        <input type="date" placeholder='Data da reserva'/>

        <input type="number" placeholder='Horário'/>

        <input type="text" placeholder='Nome do Cliente'/>

        <input type="number" placeholder='Contato'/>

        <input type="number" placeholder='Seleção da mesa'/>
      
      </div>

      <br/>
      <button>Reservar</button>

      </div>
    </>
  )
}

export default Reservar
