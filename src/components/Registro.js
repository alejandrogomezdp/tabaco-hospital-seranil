// Registro.js
import React, { useState } from 'react';
import axios from 'axios';
import './Registro.css';
import { useNavigate } from 'react-router-dom';


function Registro() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const isValidEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username,
            password,
            fullName,
            email,
            birthdate,
            address,
            phone
        };
        try {
            const response = await axios.post('http://localhost:3001/register', newUser);
            console.log(response.data);
            setError(null);
            navigate('/iniciar-sesion');
        } catch (err) {
            setError(err.response.data.error);
        }
    };


    return (
        <div className='form-register text-center'>
            <img className="imglogoregistro" src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo-registro" width="300px" height="130px" />
            <h2>Registro Médico</h2>
            {error && <div className="alert-2 alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Fecha de nacimiento"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Número de teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit" className="btn btn-lg btn-primary btn-block">Registrarse</button>
            </form>
        </div>
    );
}

export default Registro;
