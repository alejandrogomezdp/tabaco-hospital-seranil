import React, { useState } from 'react';
import axios from 'axios';
import './IniciarSesion.css';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate



function Login(props) {
    const navigate = useNavigate();  // Utiliza el hook useNavigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const cors = require('cors');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            if (response && response.data && response.data.success) {
                navigate('/transaccion-nueva');
            } else if (response && response.data) {
                setError(response.data.message);
            } else {
                setError("Error desconocido al iniciar sesión");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error);
            } else {
                setError("Error al conectarse al servidor");
                console.error(err);
            }
        }
    };

    return (
        <div className='form-signin text-center'>
            <h1 className="h3 mb-3 font-weight-normal">Iniciar sesión</h1>
            <div className="alert-container">
                {error && <div className="alert alert-danger text-center">{error}</div>}
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username" className="sr-only">Usuario</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                />
                <label htmlFor="password" className="sr-only">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    Iniciar sesión
                </button>
            </form>
            <a href="/registro">Registrarse</a>
        </div>
    );
}

export default Login;