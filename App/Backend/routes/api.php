<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PacienteController;

Route::get('/pacientes', [PacienteController::class, 'index']);

Route::post('/pacientes', [PacienteController::class, 'store']);

Route::delete('/pacientes/{id}', [PacienteController::class, 'destroy']);