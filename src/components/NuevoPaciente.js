import React, { useState } from 'react';
import axios from 'axios';
import './NuevoPaciente.css';

function NuevoPaciente() {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const getDateTime = () => {
        const currentDate = new Date().toISOString().split('T');
        return {
            fecha: currentDate[0],
            hora: currentDate[1].split('.')[0]
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fecha, hora } = getDateTime();

        try {
            await axios.post('http://localhost:3001/addPaciente', { nombreCompleto, fecha, hora });
            setMessage('Paciente registrado con éxito!');
            setError(null);
            setNombreCompleto('');
        } catch (err) {
            setError('Error al registrar el paciente. Por favor, inténtelo de nuevo.');
            setMessage(null);
        }
    };

    return (
        <div className="appleStyle-container">
            <div className="alert alert-primary" role="alert">
                <img src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo" width="300px" height="130px"></img>
            </div>
            <h1 className="appleStyle-title">Registrar nuevo paciente</h1>
            {message && <div className="appleStyle-alert-success">{message}</div>}
            {error && <div className="appleStyle-alert-error">{error}</div>}
            <form onSubmit={handleSubmit} className="appleStyle-form">
                <div className="appleStyle-formGroup">
                    <label htmlFor="nombreCompleto" className="appleStyle-label">Nombre completo:</label>
                    <input
                        type="text"
                        id="nombreCompleto"
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        className="appleStyle-input"
                        required
                    />
                </div>

                <button type="submit" className="appleStyle-button">Registrar</button>
            </form>
        </div>
    );
}

export default NuevoPaciente;
