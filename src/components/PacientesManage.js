import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PacientesManage.scss';

function PacientesManage() {
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [nombreCompleto, setNombreCompleto] = useState('');

    useEffect(() => {
        fetchPacientes();
    }, []);

    const fetchPacientes = async () => {
        const response = await axios.get('http://localhost:3001/pacientes');
        console.log("Datos recibidos de la API:", response.data); // Añadido para depuración
        setPacientes(response.data);
    };

    const handleEdit = (paciente) => {
        console.log("Editando paciente con ID:", paciente.id_paciente);  // Añadido para depuración
        setSelectedPaciente(paciente);
        setNombreCompleto(paciente.nombre_completo);
    };


    const handleSave = async () => {
        console.log("Guardando cambios para paciente con ID:", selectedPaciente.id_paciente);
        await axios.put(`http://localhost:3001/pacientes/${selectedPaciente.id_paciente}`, {
            nombre_completo: nombreCompleto
        });
        fetchPacientes();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/pacientes/${id}`);
        fetchPacientes();
    };

    return (
        <div className="pacientes-manage">
            <h2>Gestión de Pacientes</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre completo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(paciente => (
                        <tr key={paciente.id_paciente}>
                            <td>{paciente.nombre_completo}</td>
                            <td>
                                <button onClick={() => handleEdit(paciente)}>Editar</button>
                                <button onClick={() => handleDelete(paciente.id_paciente)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedPaciente && (
                <div>
                    <h3>Editando: {selectedPaciente.nombre_completo}</h3>
                    <label>
                        Nombre completo:
                        <input value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
                    </label>
                    <button onClick={handleSave}>Guardar</button>
                </div>
            )}
        </div>
    );
}

export default PacientesManage;
