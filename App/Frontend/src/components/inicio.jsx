import { useState } from "react";
import {  LineChart,  Line,  XAxis,  YAxis,  CartesianGrid,  Tooltip,  ResponsiveContainer,} from "recharts";

export default function Inicio() {
  const [filtro, setFiltro] = useState("");

  const pacientes = [
    {
      nombre: "Juan Pérez",
      especialidad: "Audiología",
      diagnostico: "Hipoacusia Leve",
      porcentaje: 37.6,
    },
    {
      nombre: "María Gómez",
      especialidad: "Inmunoterapia",
      diagnostico: "Control de Tratamiento",
      porcentaje: 82,
    },
    {
      nombre: "Carlos Rodríguez",
      especialidad: "Fisioterapia",
      diagnostico: "Rehabilitación Rodilla",
      porcentaje: 65,
    },
    {
      nombre: "Ana Martínez",
      especialidad: "Otorrinolaringología",
      diagnostico: "Rinitis Alérgica",
      porcentaje: 78,
    },
    {
      nombre: "Luis Fernández",
      especialidad: "Audiología",
      diagnostico: "Hipoacusia Severa",
      porcentaje: 11.2,
    },
    {
      nombre: "Sofía Ramírez",
      especialidad: "Alergología",
      diagnostico: "Prueba Cutánea",
      porcentaje: 91,
    },
  ];

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  const datosGrafica = [
    { especialidad: "Audiología", pacientes: 315 },
    { especialidad: "Inmunoterapia", pacientes: 420 },
    { especialidad: "Fisioterapia", pacientes: 515 },
    { especialidad: "Otorrino", pacientes: 280 },
    { especialidad: "Alergología", pacientes: 360 },
  ];

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <h1 className="display-5 fw-bold mb-4 text-primary">
        Dashboard Clínico IPS
      </h1>

      {/* Tarjetas */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Pacientes Activos</h6>
              <h2 className="fw-bold">1250</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Inmunoterapia</h6>
              <h2 className="fw-bold">420</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Audiología</h6>
              <h2 className="fw-bold">315</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Fisioterapia</h6>
              <h2 className="fw-bold">515</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="mb-4">
            Estadísticas de Pacientes por Especialidad
          </h4>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar paciente..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Paciente</th>
                  <th>Especialidad</th>
                  <th>Diagnóstico</th>
                  <th>Indicador</th>
                </tr>
              </thead>

              <tbody>
                {pacientesFiltrados.map((paciente, index) => (
                  <tr key={index}>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.especialidad}</td>
                    <td>{paciente.diagnostico}</td>
                    <td>{paciente.porcentaje}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Gráfica */}
      <div className="card shadow-sm border-0 mt-4">
        <div className="card-body">
          <h4 className="mb-4">
            Pacientes Atendidos por Especialidad
          </h4>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={datosGrafica}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="especialidad" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="pacientes"
                stroke="#0d6efd"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}