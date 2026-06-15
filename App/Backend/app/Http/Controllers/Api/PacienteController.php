<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Paciente;

class PacienteController extends Controller
{
    // Listar pacientes
    public function index()
    {
        return response()->json(Paciente::all(), 200);
    }

    // Crear paciente
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'documento' => 'required|string|unique:pacientes',
            'telefono' => 'required|string|max:20',
            'especialidad' => 'required|string|max:100',
        ]);

        $paciente = Paciente::create([
            'nombre' => $request->nombre,
            'documento' => $request->documento,
            'telefono' => $request->telefono,
            'especialidad' => $request->especialidad
        ]);

        return response()->json([
            'mensaje' => 'Paciente creado correctamente',
            'paciente' => $paciente
        ], 201);
    }

    // Eliminar paciente
    public function destroy($id)
    {
        $paciente = Paciente::findOrFail($id);

        $paciente->delete();

        return response()->json([
            'mensaje' => 'Paciente eliminado correctamente'
        ], 200);
    }
}