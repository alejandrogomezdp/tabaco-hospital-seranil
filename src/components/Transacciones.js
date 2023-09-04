import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './Transacciones.css';

function Transacciones() {
    const [transacciones, setTransacciones] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('23:59');
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3001/transacciones-api');
            console.log("Respuesta de la API:", response.data);

            const filteredTransacciones = response.data.filter(transaccion => {
                const transaccionDateTime = transaccion.fecha.split('T')[0] + 'T' + transaccion.hora; // Corrección aquí
                console.log("Concatenación fecha y hora:", transaccionDateTime);
                const transaccionDate = new Date(transaccionDateTime);
                const startDate = new Date(date + 'T' + startTime);
                const endDate = new Date(date + 'T' + endTime);

                console.log("Fecha transacción:", transaccionDate);
                console.log("Fecha inicio:", startDate);
                console.log("Fecha fin:", endDate);

                return transaccionDate >= startDate && transaccionDate <= endDate;
            });

            console.log("Transacciones filtradas:", filteredTransacciones);
            setTransacciones(filteredTransacciones);
            setError(null);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Hubo un problema al obtener las transacciones. Por favor intenta más tarde.");
        }
    }, [date, startTime, endTime]);

    return (
        <>
            <section className="contenedor-transacciones">
                <img src="https://www.seranil.com/images/web/logo-seranil.png" alt="logos2" width="300px" height="130px" />
            </section>
            <div className="transacciones">
                <h1 style={{ textAlign: 'center' }}>Transacciones de tabaco</h1>
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
                    <button style={{ background: "white", color: "black", padding: ".5em" }} onClick={fetchData}>Buscar</button>
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
        </>
    );
}

export default Transacciones;
