import { useEffect, useState } from 'react';
import api from './services/api';

import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function App() {

    const [pacientes, setPacientes] = useState([]);

    const [nombre, setNombre] = useState('');
    const [documento, setDocumento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [especialidad, setEspecialidad] = useState('');

    useEffect(() => {
        cargarPacientes();
    }, []);

    const cargarPacientes = async () => {
    const response = await api.get('/pacientes');

    console.log(response.data);

    setPacientes(response.data);
};

    const crearPaciente = async () => {

       console.log({
       nombre,
       documento,
       telefono,
       especialidad
});
        await api.post('/pacientes', {
        nombre,
        documento,
        telefono,
        especialidad
});

        setNombre('');
        setDocumento('');
        setTelefono('');
        setEspecialidad('');
        cargarPacientes();
    };

    const eliminarPaciente = async (id) => {

        await api.delete(`/pacientes/${id}`);

        cargarPacientes();
    };

const conteoEspecialidades = {};

pacientes.forEach((paciente) => {
    if (paciente.especialidad) {
        conteoEspecialidades[paciente.especialidad] =
            (conteoEspecialidades[paciente.especialidad] || 0) + 1;
    }
});

const datosGrafica = {
    labels: Object.keys(conteoEspecialidades),
    datasets: [
        {
            label: 'Pacientes por Especialidad',
            data: Object.values(conteoEspecialidades),
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 174, 255, 0.2)',
            tension: 0.4
        }
    ]
};
    return (
    <div>
        <h1>Gestión de Pacientes</h1>
        <div className="formulario">
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                type="text"
                placeholder="Documento"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
            />

            <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
            />

            <select
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
            >
                <option value="">Seleccione especialidad</option>
                <option value="Alergología">Alergología</option>
                <option value="Otorrinolaringología">Otorrinolaringología</option>
                <option value="Audiología">Audiología</option>
                <option value="Rinometría">Rinometría</option>
            </select>

            <button className="btn-guardar" onClick={crearPaciente}
>                Guardar Paciente
            </button>
        </div>

        <h2>Tabla de Pacientes</h2>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Teléfono</th>
                    <th>Especialidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {pacientes.map((paciente) => (
                    <tr key={paciente.id}>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.documento}</td>
                        <td>{paciente.telefono}</td>
                        <td>{paciente.especialidad}</td>
                        <td>
                            <button
                                className="btn-eliminar"
                                onClick={() => eliminarPaciente(paciente.id)}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="grafica-container">
            <h2>Pacientes por Especialidad</h2>
            <div
                style={{
                    width: '800px',
                    margin: '0 auto'
                }}
            >
                <Line data={datosGrafica} />
            </div>
        </div>
    </div>
);
}

export default App;