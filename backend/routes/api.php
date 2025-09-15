<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;

Route::get('/items', [ItemController::class, 'index']);
Route::post('/items', [ItemController::class, 'store']);
Route::patch('/items/{id}/quantity', [ItemController::class, 'updateQuantity']);
Route::delete('/items/{id}', [ItemController::class, 'destroy']);
