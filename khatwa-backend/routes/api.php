<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\EmailVerificationController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\NotificationController;



// ✅ Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ Lien de vérification d’email — redirige vers le frontend (signup)
Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, '__invoke'])
    ->middleware(['signed'])
    ->name('verification.verify');

// ✅ Routes protégées (auth:api)
Route::middleware('auth:api')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // ✅ Renvoi du lien de vérification
    Route::post('/email/verification-notification', [EmailVerificationController::class, 'resend'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
});

// ✅ Route fictive signup (utile pour redirection Laravel)
Route::get('/signup', function () {
    return response()->json(['message' => 'Redirection vers /signup réussie.'], 401);
})->name('signup');

// ✅ Route debug hash (optionnelle pour tests)
Route::get('/debug/email-hash/{id}', function ($id) {
    $user = User::findOrFail($id);
    return response()->json([
        'hash' => sha1($user->getEmailForVerification())
    ]);
});
Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);
   //les notifications
Route::middleware('auth:api')->get('/notifications', [NotificationController::class, 'index']);


//routes pour challenges
Route::middleware('auth:api')->group(function () {
    Route::apiResource('challenges', ChallengeController::class);
});


//teste de notification 
Route::get('/test-notification', [ChallengeController::class, 'testNotification']);
Route::middleware('auth:api')->post('/notifications/{id}/read', function ($id) {
    $notification = auth()->user()->notifications()->where('id', $id)->first();

    if ($notification) {
        $notification->markAsRead();
        return response()->json(['message' => 'Notification marquée comme lue']);
    }

    return response()->json(['message' => 'Notification introuvable'], 404);
});

//dashboard 
Route::middleware('auth:api')->get('/dashboard-data', [\App\Http\Controllers\DashboardController::class, 'index']);
