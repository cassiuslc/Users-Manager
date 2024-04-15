<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DatabaseCheckController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::get('me', [AuthController::class, 'me'])->name('me');
});


Route::group([
    //'middleware' => 'auth:api',
    'prefix' => 'db'
], function ($router) {
    Route::get('/healthcheck', [DatabaseCheckController::class, 'check'])->name('db.status');
    Route::get('/generate-users', [DatabaseCheckController::class, 'generateUsers'])->name('db.generate');
    Route::get('/clear-database', [DatabaseCheckController::class, 'clearDatabase'])->name('db.clear');
});

Route::group([
    //'middleware' => 'auth:api',
    'prefix' => 'users'
], function ($router) {
    Route::post('/create', [UserController::class, 'register'])->name('user.create');
    Route::get('/', [UserController::class, 'index'])->name('user.index');
    Route::get('/{id}', [UserController::class, 'show'])->name('user.show');
    Route::put('/{id}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/{id}', [UserController::class, 'destroy'])->name('user.destroy');
});
