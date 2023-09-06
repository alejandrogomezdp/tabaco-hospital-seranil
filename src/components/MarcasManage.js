import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importación correcta de Bootstrap
import './MarcasManage.scss';

function MarcasManage() {
    const [marcas, setMarcas] = useState([]);
    const [selectedMarca, setSelectedMarca] = useState(null);
    const [nombre, setNombre] = useState('');
    const [cigarCount, setCigarCount] = useState('');

    useEffect(() => {
        fetchMarcas();
    }, []);

    const fetchMarcas = async () => {
        const response = await axios.get('http://localhost:3001/marcas');
        setMarcas(response.data);
    };

    const handleEdit = (marca) => {
        console.log("Editando marca con ID:", marca.id);
        setSelectedMarca(marca);
        setNombre(marca.nombre);
        setCigarCount(marca.cigarCount);
    };

    const handleSave = async () => {
        console.log("Guardando cambios para marca con ID:", selectedMarca.id);
        await axios.put(`http://localhost:3001/marcas/${selectedMarca.id}`, {
            nombre: nombre,
            cigarCount: cigarCount
        });
        fetchMarcas();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/marcas/${id}`);
        fetchMarcas();
    };

    return (
        <div className='menu-principal'>
            <img className="imglogoregistro" src="https://www.seranil.com/images/web/logo-seranil.png" alt="logo-registro" width="300px" height="130px" />

            <h2 className='gestion-marcas'>Gestión de Marcas de Tabaco</h2>

            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/nuevo-paciente">Nuevo Paciente</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/alta-tabaco">Alta Tabaco</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/modificar-pacientes">Modificar Pacientes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/modificar-marcas-tabaco">Modificar Marcas de Tabaco</Link>
                </li>
            </ul>

            <div className="marcas-manage">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad Cigarros</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marcas.map(marca => (
                            <tr key={marca.id}>
                                <td>{marca.nombre}</td>
                                <td>{marca.cigarCount}</td>
                                <td>
                                    <button onClick={() => handleEdit(marca)}>Editar</button>
                                    <button onClick={() => handleDelete(marca.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedMarca && (
                    <div>
                        <h3>Editando: {selectedMarca.nombre}</h3>
                        <label>
                            Nombre:
                            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </label>
                        <label>
                            Cantidad de Cigarros:
                            <input value={cigarCount} onChange={(e) => setCigarCount(e.target.value)} />
                        </label>
                        <button onClick={handleSave}>Guardar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarcasManage;
