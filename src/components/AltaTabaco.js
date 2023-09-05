import React, { useState } from 'react';
import axios from 'axios';
import './AltaTabaco.css';

function AltaTabaco() {
    const [nombre, setNombre] = useState('');
    const [cigarCount, setCigarCount] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/addPaquete', { nombre, cigarCount });
            setMessage('Marca registrada con éxito!');
            setError(null);
            setNombre('');
            setCigarCount('');
        } catch (err) {
            setError('Error al registrar la marca. Por favor, inténtelo de nuevo.');
            setMessage(null);
        }
    };

    return (
        <div className="appleStyleTabaco-container">
            <div className="alert alert-primary" role="alert">
                <img src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo" width="300px" height="130px"></img>
            </div>
            <h1 className="appleStyleTabaco-title">Registrar nueva marca de tabaco</h1>
            {message && <div className="appleStyleTabaco-alert-success">{message}</div>}
            {error && <div className="appleStyleTabaco-alert-error">{error}</div>}
            <form onSubmit={handleSubmit} className="appleStyleTabaco-form">
                <div className="appleStyleTabaco-formGroup">
                    <label htmlFor="nombre" className="appleStyleTabaco-label">Nombre de la marca:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="appleStyleTabaco-input"
                        required
                    />
                </div>
                <div className="appleStyleTabaco-formGroup">
                    <label htmlFor="cigarCount" className="appleStyleTabaco-label">Cantidad de cigarros en el paquete:</label>
                    <input
                        type="number"
                        id="cigarCount"
                        value={cigarCount}
                        onChange={(e) => setCigarCount(e.target.value)}
                        className="appleStyleTabaco-input"
                        required
                    />
                </div>

                <button type="submit" className="appleStyleTabaco-button">Registrar</button>
            </form>
        </div>
    );
}

export default AltaTabaco;
