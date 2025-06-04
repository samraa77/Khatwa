<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
      $validator = Validator::make($request->all(), [
    'nom'      => 'required|string|max:255',
    'prenom'   => 'required|string|max:255',
    'email'    => 'required|string|email|max:255|unique:users',
    'password' => 'required|string|min:6',
    'age'      => 'required|integer',
    'pays'     => 'required|string',
    'language' => 'required|string',
    'opinion'  => 'nullable|string',
]);

if ($validator->fails()) {
    return response()->json($validator->errors(), 422);
}

$user = User::create([
    'nom'      => $request->nom,
    'prenom'   => $request->prenom,
    'email'    => $request->email,
    'password' => $request->password,
    'age'      => $request->age,
    'pays'     => $request->pays,
    'language' => $request->language,
    'opinion'  => $request->opinion,
]);

         $user->sendEmailVerificationNotification();


        return response()->json(['message' => 'Inscription réussie', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Identifiants invalides'], 401);
        }

        return response()->json(['token' => $token]);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function profile()
    {
        return response()->json(auth()->user());
    }
}
