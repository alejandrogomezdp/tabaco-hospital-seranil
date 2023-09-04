// Registro.js
import React, { useState } from 'react';
import axios from 'axios';
import './Registro.css';

function Registro() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);

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
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <div className='form-register text-center'>
            <img src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo-registro" width="300px" height="130px" />
            <h2>Registro</h2>
            {error && <div className="alert alert-danger">{error}</div>}
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
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Registro;
