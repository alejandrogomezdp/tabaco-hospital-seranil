import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import './TransaccionNueva.scss';

function TransaccionNueva() {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [qty, setQty] = useState(0);
    const [isWholePack, setIsWholePack] = useState(false);
    const [patients, setPatients] = useState([]);
    const [patientName, setPatientName] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3001/marcas')
            .then(response => setBrands(response.data))
            .catch(error => console.error("Hubo un error al obtener las marcas:", error));

        axios.get('http://localhost:3001/pacientes')
            .then(response => {
                setPatients(response.data.map(patient => patient.nombre_completo));
            })
            .catch(error => console.error("Hubo un error al obtener los pacientes:", error));
    }, []);

    const handlePatientChange = (selectedOption) => {
        setPatientName(selectedOption ? selectedOption.value : '');
    }

    function handleSubmit() {

        console.log("selectedBrand:", selectedBrand);
        console.log("patientName:", patientName);
        console.log("qty:", qty);

        if (!selectedBrand || !patientName || qty <= 0) {
            alert("Por favor, rellena todos los campos correctamente.");
            return;
        }

        const totalCigarros = calculation();
        const transaction = {
            id_marca: brands.find(brand => brand.nombre === selectedBrand).id,
            cantidad_cigarros: totalCigarros,
            paquete_completo: isWholePack ? 1 : 0,
            fecha_hora: new Date().toISOString().split('.')[0],
            nombre_completo: patientName,
        };

        axios.post('http://localhost:3001/submit', transaction)
            .then(response => {
                alert(`Datos enviados con éxito: ${patientName} ha fumado ${totalCigarros} cigarrillos.`);
            })
            .catch(error => {
                console.error("Error detallado:", error.response.data);
                alert("Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.");
            });
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
        <div className="transaccion-container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="transaccion-card p-4 rounded shadow">
                <img src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo" className="mb-4" width="230px" height="100px" />
                <h1 className="mb-4">Inventario de tabaco</h1>
                <Select
                    options={patientOptions}
                    value={{ label: patientName, value: patientName }}
                    onChange={handlePatientChange}
                    placeholder="Paciente..."
                    className="mb-4"
                />

                <div className="mb-4">
                    <h3>Cantidad de cigarros:</h3>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Introduzca la cantidad"
                        value={qty}
                        onChange={(event) => setQty(event.target.value)}
                    />
                </div>

                <div className="mb-4 d-flex align-items-center">
                    <h3 className="mr-3">¿Paquete completo?</h3>
                    <input
                        type="checkbox"
                        checked={isWholePack}
                        onChange={(event) => setIsWholePack(event.target.checked)}
                    />
                </div>

                <div className="mb-4">
                    <h3>Marca de cigarro:</h3>
                    <select
                        value={selectedBrand}
                        onChange={(event) => setSelectedBrand(event.target.value)}
                        className="form-control"
                    >
                        <option value="">Seleccione una marca...</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.nombre}>
                                {brand.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="resultadofinal mb-4">
                    <h2>Resumen:</h2>
                    
                    <p>{tobaccoPacketDetail()}</p>
                    <button className="btn btn-success btn-block" onClick={handleSubmit}>Enviar datos</button>

                </div>
            </div>
        </div>
    );
}

export default TransaccionNueva;