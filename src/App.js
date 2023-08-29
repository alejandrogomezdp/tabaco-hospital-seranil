import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [qty, setQty] = useState(0);
  const [isWholePack, setIsWholePack] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/marcas')
      .then(response => response.json())
      .then(data => setBrands(data));
  }, []);

  function getBrandCigarCount() {
    // Encuentra la marca seleccionada en el array de marcas.
    const brand = brands.find(brand => brand.nombre === selectedBrand);

    // Si encontramos la marca, retornamos el valor de cigarCount, si no, retornamos 0.
    return brand ? brand.cigarCount : 0;
  }

  function calculation() {
    let quantity = parseInt(qty, 10);
    if (isNaN(quantity) || quantity < 0) {
      quantity = 0;
    }

    // Si isWholePack es true, sumamos el cigarCount de la marca seleccionada al total.
    return isWholePack ? quantity + getBrandCigarCount() : quantity;
  }

  function handleSubmit() {
    const data = {
      brand: selectedBrand,
      quantity: calculation()
    };

    axios.post('/submit', data)
      .then(response => {
        alert(`Datos enviados con éxito: ${data.quantity} de ${data.brand}`);
      })
      .catch(error => {
        alert("Error al enviar los datos.");
        console.error(error);
      });
  }

  function tobaccoPacketDetail() {
    const totalCigarros = calculation();
    return `${totalCigarros} Cigarros de ${selectedBrand}`;
  }

  return (
    <div className="container">
      <div className="alert alert-primary" role="alert">
        <img src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo" width="300px" height="130px"></img>
        <h1>Inventorio de tabaco</h1>
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
      <div>
        <h3>Paquete de tabaco:</h3>
        <select
          className="form-control"
          value={selectedBrand}
          onChange={(event) => { setSelectedBrand(event.target.value); }}>
          <option value="">Seleccionar...</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.nombre}>{brand.nombre}</option>
          ))}
        </select>
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
        <div className="alert alert-danger" role="alert">

        </div>
        <div className="alert alert-success" role="alert">
          <label>El paciente tiene: </label>
          <h3 className="totalpaquetedetabaco">{tobaccoPacketDetail()}</h3>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default App;
