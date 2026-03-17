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

Route::get('/auth/microsoft2', function () {
    return Socialite::driver('microsoft')->redirect();
})->name('microsoft2.login');

Route::get('/auth/microsoft2/callback', function () {
    $microsoftUser = Socialite::driver('microsoft')->stateless()->user();

    $user = User::updateOrCreate(
        ['email' => $microsoftUser->getEmail()],
        [
            'name' => $microsoftUser->getName(),
            'microsoft_id' => $microsoftUser->getId(),
            'password' => bcrypt(str()->random(16)),
        ]
    );

    Auth::login($user);

    return redirect()->route('dashboard');
})->name('microsoft2.callback');

require __DIR__.'/settings.php';
