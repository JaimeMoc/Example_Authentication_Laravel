<?php

use App\Http\Controllers\SecurityController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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

Route::get('/auth/microsoft', function () {
    return Socialite::driver('microsoft')->redirect();
})->name('microsoft.login');

Route::get('/auth/microsoft/callback', function () {
    $microsoftUser = Socialite::driver('microsoft')->user();

    // Buscar o crear usuario
    $user = User::updateOrCreate(
        ['email' => $microsoftUser->getEmail()],
        [
            'name' => $microsoftUser->getName(),
            'microsoft_id' => $microsoftUser->getId(),
        ]
    );

    Auth::login($user);

    return redirect()->route('dashboard');
})->name('microsoft.callback');

require __DIR__.'/settings.php';
