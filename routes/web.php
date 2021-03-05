<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
Route::post('/logout', [LogoutController::class,'store'])->name('logout');
Route::get('/',function(){
    return view('home');
})->name('home');

Route::get('/login', [LoginController::class,'index'])->name('login');
Route::post('/login', [LoginController::class,'store']);
Route::get('/dashboard', [DashboardController::class,'index'])->name('dashboard');
Route::get('/register', [RegisterController::class,'index'])->name('register');
Route::post('/register', [RegisterController::class,'store']);
Route::get('/posts', [PostController::class,'index'])->name('posts');
Route::post('/posts', [PostController::class,'store']);

Route::get('/tasks', function () {
    return view('tasks.tasks');
})->name('tasks')->middleware('auth');