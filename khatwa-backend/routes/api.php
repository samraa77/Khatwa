<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

// 🔓 Routes publiques (pas besoin d'être connecté)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 🔐 Routes protégées (besoin d'un token JWT)
Route::middleware('auth:api')->group(function () {

    // Déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);

    // 📨 Route de vérification d’email (cliquée via le lien envoyé par mail)
    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return response()->json(['message' => 'Email vérifié avec succès']);
})->middleware(['signed'])->name('verification.verify');

    // 🔁 Renvoi du lien de vérification (si l’utilisateur ne l’a pas reçu)
    
Route::post('/email/verification-notification', function (Request $request) {
    auth()->user()->sendEmailVerificationNotification();

    return response()->json(['message' => 'Lien de vérification envoyé.']);
})->middleware(['auth:api', 'throttle:6,1'])->name('verification.send');

    // 🔍 Exemple de route protégée après vérification d’email
    Route::get('/profile', [AuthController::class, 'profile'])->middleware('verified');
});
