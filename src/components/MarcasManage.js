import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarcasManage.scss';

function MarcasManage() {
    const [marcas, setMarcas] = useState([]);
    const [selectedMarca, setSelectedMarca] = useState({});
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
        setSelectedMarca(marca);
        setNombre(marca.nombre);
        setCigarCount(marca.cigarCount);
    };

    const handleSave = async () => {
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
        <div className="marcas-manage">
            <h2>Gestión de Marcas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad de Cigarros</th>
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
            {selectedMarca.id && (
                <div>
                    <h3>Editando: {selectedMarca.nombre}</h3>
                    <label>
                        Nombre:
                        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </label>
                    <label>
                        Cantidad de Cigarros:
                        <input type="number" value={cigarCount} onChange={(e) => setCigarCount(e.target.value)} />
                    </label>
                    <button onClick={handleSave}>Guardar</button>
                </div>
            )}
        </div>
    );
}

export default MarcasManage;
