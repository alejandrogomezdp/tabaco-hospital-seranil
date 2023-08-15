import { useState } from "react";
import './App.css'

function App() {
  const [selects, setSelects] = useState('');
  const [qty, setQty] = useState(0);
  const [isWholePack, setIsWholePack] = useState(false);

  function calculation() {
    let quantity = parseInt(qty, 10);

    if (isNaN(quantity) || quantity < 0) {
      quantity = 0;
    }

    return isWholePack ? quantity + 20 : quantity; // Agregamos 20 si isWholePack es verdadero
  }

  function handleSubmit() {
    alert(`Submitted: ${qty} of ${selects}`);
  }

  function paquetedetabaco() {
    const totalCigarros = isWholePack ? qty + 20 : qty;
    return `${totalCigarros} Cigarros de ${selects}`;
  }

  return (
    <div className="container">
      <div className="alert alert-primary" role="alert">
        <img src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo" width="300px" height="130px"></img>
        <h1>Inventorio de tabaco</h1>
      </div>


      <div className="form-group">
        <h3>Paquete de tabaco:</h3>
        <select
          className="form-control"
          value={selects}
          onChange={(event) => { setSelects(event.target.value); }}>
          <option value="Seleccionar...">Seleccionar...</option>
          <option value="Lucky Strike Mentolado">Lucky Strike Mentolado</option>
          <option value="Lucky Strike">Lucky Strike</option>
          <option value="Malboro">Malboro</option>
          <option value="Palm Mall">Palm Mall</option>
          <option value="Malboro Mentolado">Malboro Mentolado</option>
          <option value="Palm Mall Mentolado">Palm Mall Mentolado</option>
        </select>
      </div>

      <div className="alert alert-danger" role="alert">
        <h3><b>Cantidad de cigarros:</b> {calculation()}<br />
          <b>Marca y paquete: </b>  {selects} <br /></h3>
      </div>

      <div className="form-group-2">
        <h3>Cantidad de cigarros:</h3>
        <input
          type="number"
          className="form"
          placeholder="Introduzca la cantidad"
          onChange={(event) => {
            const value = parseInt(event.target.value, 10);
            if (!isNaN(value) && value >= 0) {
              setQty(value);
            }
          }}
        />
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          id="paqueteentero"
          name="paqueteentero"
          checked={isWholePack}
          onChange={() => setIsWholePack(!isWholePack)}
        />
        <label htmlFor="paqueteentero"> Paquete entero</label>
      </div>

      <div className="form-group">
        <h3>Paquete de tabaco:</h3>
        <select
          className="form-control"
          value={selects}
          onChange={(event) => { setSelects(event.target.value); }}>
          <option value="Seleccionar...">Seleccionar...</option>
          <option value="Lucky Strike Mentolado">Lucky Strike Mentolado</option>
          <option value="Lucky Strike">Lucky Strike</option>
          <option value="Malboro">Malboro</option>
          <option value="Palm Mall">Palm Mall</option>
          <option value="Malboro Mentolado">Malboro Mentolado</option>
          <option value="Palm Mall Mentolado">Palm Mall Mentolado</option>
        </select>
      </div>

      <div className="alert alert-danger" role="alert">
        <h3><b>Cantidad de cigarros:</b> {calculation()}<br />
          <b>Marca y paquete: </b>  {selects} <br /></h3>
      </div>

      <div className="alert alert-success" role="alert">
        <label>El paciente tiene: </label>
        <h3 className="totalpaquetedetabaco">{paquetedetabaco()}</h3>
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default App;
