import React, { useState } from 'react';
import axios from 'axios';
import './IniciarSesion.scss'; // Cambiar .css a .scss
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


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
        <body className="bodylogin">
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className='form-signin text-center'>
                <img className="imglogoregistro mb-4" src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo-registro" width="230px" height="100px" />
                <h1 className="h3 mb-3 font-weight-normal">Iniciar sesión</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario o Correo Electrónico</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            placeholder="Usuario o Correo Electrónico"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
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
                    </div>
                    <button className="btn btn btn-primary btn-block" type="submit">
                        Iniciar sesión
                    </button>
                    <div className="mt-3">
                        <a href="/registro">Registrarse</a>
                    </div>
                </form>
            </div>
        </div>
        </body>
    );
}

export default Login;