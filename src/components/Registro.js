import React, { useState } from 'react';
import axios from 'axios';
import './Registro.scss';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap';

function Registro() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(null);
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordMatch("Las contraseñas no coinciden.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Correo electrónico inválido.");
            return;
        }

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
            setPasswordMatch(null);
            navigate('/iniciar-sesion');
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <html className='html-registro' style={{ backgroundColor: 'blue' }}>
        <body className="body-registro">
            <div className='form-register text-center'>
                <img className="imglogoregistro" src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo-registro" width="300px" height="130px" />
                <h2 className="mb-4">Registro Médico</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {passwordMatch && <Alert variant="warning">{passwordMatch}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre Completo</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control type="user" placeholder="Nombre de Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Confirmar Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control type="date" placeholder="Fecha de Nacimiento" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="tel" placeholder="Número de teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-lg btn-block mt-4">Registrarse</Button>
                </Form>
            </div>
        </body>
        </html>
    );
}

export default Registro;
