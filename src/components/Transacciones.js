import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Transacciones.scss';

function Transacciones() {
    const [transacciones, setTransacciones] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);  // <-- Define startDate
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);      // <-- Define endDate
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('23:59');
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3001/transacciones-api');
            const filteredTransacciones = response.data.filter(transaccion => {
                const transaccionDateTime = transaccion.fecha.split('T')[0] + 'T' + transaccion.hora;
                const transaccionDate = new Date(transaccionDateTime);
                const startDateTime = new Date(startDate + 'T' + startTime);
                const endDateTime = new Date(endDate + 'T' + endTime);
                return transaccionDate >= startDateTime && transaccionDate <= endDateTime;  // <-- Use startDateTime and endDateTime
            });
            setTransacciones(filteredTransacciones);
            setError(null);
        } catch (err) {
            setError("Hubo un problema al obtener las transacciones. Por favor intenta más tarde.");
        }
    }, [startDate, endDate, startTime, endTime]);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/marcas');
                setMarcas(response.data);
            } catch (err) {
                console.error("Error fetching marcas:", err);
            }
        };
        fetchMarcas();
    }, []);

    return (
        <div className="transacciones-page container-fluid">
            <section className="transacciones-header text-center my-4">
                <img src="https://www.seranil.com/images/web/logo-seranil.png" alt="logos2" className="img-fluid inverted-logo" />
            </section>
            <div className="transacciones-content">
                <h1 className="text-center mb-4">Transacciones de tabaco</h1>

                <div className="filters d-flex justify-content-center mb-4">
                    <label>
                        Desde:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                    <label>
                        Hasta:
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                    <label>
                        Desde:
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </label>
                    <label>
                        Hasta:
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </label>
                </div>
                <button style={{ padding: ".5em", textAlign: 'center', marginLeft: '1em', marginBottom: '1em' }} onClick={fetchData}>Buscar</button>

                <div className="responsive-table">
                    <table>
                        <tbody>
                            {transacciones.map(transaccion => (
                                <tr key={transaccion.id_transaccion}>
                                    <td data-label="Id Transacción:">{transaccion.id_transaccion}</td>
                                    <td data-label="Marca Tabaco:">{marcas.find(marca => marca.id === transaccion.id_marca)?.nombre || 'Desconocido'}</td>
                                    <td data-label="Nombre Completo:">{transaccion.nombre_completo}</td>
                                    <td data-label="Cantidad Cigarros:">{transaccion.cantidad_cigarros}</td>
                                    <td data-label="Paquete Completo:">{transaccion.paquete_completo ? 'Sí' : 'No'}</td>
                                    <td data-label="Fecha:" className='tablafecha'>{transaccion.fecha}</td>
                                    <td data-label="Hora:">{transaccion.hora}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                {error && <p className="error text-danger text-center">{error}</p>}
            </div>
        </div>
    );
}

export default Transacciones;
