<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    /**
     * Inscription d’un utilisateur + envoi du lien de vérification
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'age' => 'required|integer',
            'pays' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'age' => $request->age,
            'pays' => $request->pays,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        return response()->json(['message' => 'Inscription réussie. Vérifiez votre email.']);
    }

    /**
     * Connexion utilisateur
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Email ou mot de passe incorrect'], 401);
        }

        if (!auth()->user()->hasVerifiedEmail()) {
            return response()->json(['error' => 'Email non vérifié.'], 403);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth()->user()
        ]);
    }

    /**
     * Déconnexion
     */
    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    /**
     * Données du profil utilisateur
     */
    public function profile()
    {
        return response()->json(auth()->user());
    }

    /**
     * Mise à jour du profil utilisateur
     */
   public function updateProfile(Request $request)
{
    $user = auth()->user();

    $data = $request->validate([
        'prenom' => 'nullable|string|max:255',
        'nom' => 'nullable|string|max:255',
        'age' => 'nullable|integer',
        'pays' => 'nullable|string|max:255',
        'email' => 'nullable|email|unique:users,email,' . $user->id,
        'password' => 'nullable|string|min:6',
        'image' => 'nullable|image|max:2048',
        'remove_photo' => 'nullable|boolean',
    ]);

    if (isset($data['password'])) {
        $data['password'] = Hash::make($data['password']);
    }

    if ($request->hasFile('image')) {
        if ($user->photo) {
            \Storage::disk('public')->delete($user->photo);
        }
        $data['photo'] = $request->file('image')->store('profiles', 'public');
    } elseif ($request->input('remove_photo') == '1') {
        if ($user->photo) {
            \Storage::disk('public')->delete($user->photo);
        }
        $data['photo'] = null;
    }

    $user->update($data);

    return response()->json([
        'message' => 'Profil mis à jour avec succès.',
        'user' => $user
    ]);
}

}
