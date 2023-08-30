import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import './App.css';

function App() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [qty, setQty] = useState(0);
  const [isWholePack, setIsWholePack] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [patientsData, setPatientsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/marcas')
      .then(response => response.json())
      .then(data => setBrands(data));

    fetch('http://localhost:3001/pacientes')
      .then(response => response.json())
      .then(data => setPatients(data.map(patient => patient.nombre_completo)));

    fetch('http://localhost:3001/pacientes')
      .then(response => response.json())
      .then(data => setPatientsData(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/transactions')
      .then(response => response.json())
      .then(data => setTransactionsData(data));
  }, []);

  function handleSubmit() {
    const selectedPatient = patientsData.find(patient => patient.nombre_completo === patientName);
    const totalCigarros = calculation();
    const transaction = {
      id_paciente: selectedPatient.id,
      id_marca: brands.find(brand => brand.nombre === selectedBrand).id,
      cantidad_cigarros: totalCigarros,
      paquete_completo: isWholePack,
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toISOString().split('T')[1].split('.')[0]
    };

    const data = {
      nombre_completo: patientName,
      numero_cigarros: calculation(),
      paquete: selectedBrand,
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toISOString().split('T')[1].split('.')[0]
    };

    // Aquí puedes hacer la llamada a la API para guardar la transacción en la base de datos

    alert(`Datos enviados con éxito: ${patientName} ha fumado ${totalCigarros} cigarrillos.`);
  }

  function calculation() {
    let totalCigarros = parseInt(qty, 10);
    if (isNaN(totalCigarros) || totalCigarros < 0) {
      totalCigarros = 0;
    }
    if (isWholePack) {
      totalCigarros += getBrandCigarCount();
    }
    return totalCigarros;
  }

  function getBrandCigarCount() {
    const brand = brands.find(brand => brand.nombre === selectedBrand);
    return brand ? brand.cigarCount : 0;
  }

  function tobaccoPacketDetail() {
    const totalCigarros = calculation();
    return `${totalCigarros} Cigarros de ${selectedBrand}`;
  }

  const patientOptions = patients.map(patient => ({ label: patient, value: patient }));

  return (
    <div className="container">
      <div className="alert alert-primary" role="alert">
        <img src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo" width="300px" height="130px"></img>
        <h1>Inventario de tabaco</h1>
      </div>
      <Select
        options={patientOptions}
        value={{ label: patientName, value: patientName }}
        onChange={(selectedOption) => setPatientName(selectedOption ? selectedOption.value : '')}
        placeholder="Paciente..."
      />
      <div className="form-group-2">
        <h3>Cantidad de cigarros:</h3>
        <input
          type="number"
          className="form"
          placeholder="Introduzca la cantidad"
          value={qty}
          onChange={(event) => setQty(event.target.value)}
        />
      </div>
      <div className="form-group-3">
        <h3>Marcar si es un paquete completo:</h3>
        <input
          type="checkbox"
          checked={isWholePack}
          onChange={(event) => {
            setIsWholePack(event.target.checked);
          }}
        />
      </div>
      <div className="form-group">
        <h3>Marca de cigarro:</h3>
        <select
          className="form-control"
          value={selectedBrand}
          onChange={(event) => setSelectedBrand(event.target.value)}
        >
          <option value="" disabled>Seleccione una marca</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.nombre}>
              {brand.nombre}
            </option>
          ))}
        </select>
      </div>
      <h3>Resultado:</h3>
      <div className="resultado">{tobaccoPacketDetail()}</div>
      <button className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default App;
