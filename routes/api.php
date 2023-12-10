<?php

use App\Http\Controllers\RouterOSController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function(){
    //Route::get('/testApi', [RouterOSController::class, 'testApi']);
    Route::get('/listRouters', [RouterOSController::class, 'index']);
    Route::delete('/delete/{id}', [RouterOSController::class, 'destroy']);
    Route::get('/connect', [RouterOSController::class, 'routerConnection']);
    Route::get('/queueList', [RouterOSController::class, 'getQueue']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
