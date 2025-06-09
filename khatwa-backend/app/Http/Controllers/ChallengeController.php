<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\NewChallengeNotification;

class ChallengeController extends Controller
{
    public function index()
    {
        return Challenge::all();
    }

    public function store(Request $request)
    {
        $challenge = Challenge::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'duree' => $request->duree,
            'difficulte' => $request->difficulte,
            'user_id' => auth()->id(),
        ]);

        // Envoyer une notification réelle après création
        $user = auth()->user();
        $user->notify(new NewChallengeNotification($challenge));

        return response()->json([
            'message' => 'Challenge créé et notification envoyée',
            'challenge' => $challenge
        ]);
    }

    public function show($id)
    {
        return Challenge::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $challenge = Challenge::findOrFail($id);
        $challenge->update($request->all());

        return response()->json(['message' => 'Challenge mis à jour']);
    }

    public function destroy($id)
    {
        Challenge::destroy($id);
        return response()->json(['message' => 'Challenge supprimé']);
    }

    // ✅ Test manuel d'envoi de notification avec un challenge fake (à utiliser temporairement)
    public function testNotification()
    {
        $user = auth()->user(); // Tu peux mettre auth()->user() aussi

        // Challenge fictif pour test
        $fakeChallenge = (object)[
            'id' => 999,
            'titre' => 'Challenge Test Notification'
        ];

        $user->notify(new NewChallengeNotification($fakeChallenge));

        return response()->json(['message' => 'Notification test envoyée']);
    }
}
