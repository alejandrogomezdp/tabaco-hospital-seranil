import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Transacciones.css';

function Transacciones() {
    const [transacciones, setTransacciones] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('23:59');
    const [error, setError] = useState(null);

    const fetchData = useCallback(() => {
        axios.get('http://localhost:3001/transacciones-api', {
            params: {
                date: date,
                startTime: startTime,
                endTime: endTime

            }
        })
            .then(response => {
                setTransacciones(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError("Hubo un problema al obtener las transacciones. Por favor intenta más tarde.");
            });
    }, [date, startTime, endTime]);

    useEffect(() => {
        fetchData();
    }, [date, fetchData]);

    return (
        <div className="transacciones">
            <h2><center>Transacciones</center></h2>
            <div className="filters">
                <label>
                    Fecha:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label>
                    Desde:
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </label>
                <label>
                    Hasta:
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </label>
                <button onClick={fetchData}>Buscar</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id Transacción</th>
                        <th>Id Marca</th>
                        <th>Nombre Completo</th>
                        <th>Cantidad Cigarros</th>
                        <th>Paquete Completo</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {transacciones.map(transaccion => (
                        <tr key={transaccion.id_transaccion}>
                            <td>{transaccion.id_transaccion}</td>
                            <td>{transaccion.id_marca}</td>
                            <td>{transaccion.nombre_completo}</td>
                            <td>{transaccion.cantidad_cigarros}</td>
                            <td>{transaccion.paquete_completo}</td>
                            <td>{transaccion.fecha}</td>
                            <td>{transaccion.hora}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Transacciones;
