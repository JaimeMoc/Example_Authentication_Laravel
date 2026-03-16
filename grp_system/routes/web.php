<?php

use App\Http\Controllers\SecurityController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/logout-other-devices', [SecurityController::class, 'logoutOtherDevices'])
        ->name('logout-other-devices');
});

require __DIR__.'/settings.php';
