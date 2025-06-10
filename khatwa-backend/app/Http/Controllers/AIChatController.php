<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIChatController extends Controller
{
    public function chat(Request $request)
    {
        $message = $request->input('message');

        if (!$message) {
            return response()->json(['error' => 'Message requis.'], 400);
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('COHERE_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.cohere.ai/v1/chat', [
            'message' => $message,
            'chat_history' => [],
            'model' => 'command-r-plus',
            'stream' => false,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Erreur de communication avec Cohere'], 500);
        }

        return response()->json([
            'response' => $response->json()['text'] ?? 'Réponse introuvable.',
        ]);
    }

    public function generateQuestionnaire(Request $request)
    {
        $goal = $request->input('goal');

        if (!$goal) {
            return response()->json(['error' => 'Objectif requis.'], 400);
        }

        $prompt = <<<EOT
Tu es un assistant intelligent. Génère 3 à 5 questions à poser à un utilisateur qui souhaite atteindre cet objectif : "$goal".
Ces questions doivent permettre de mieux comprendre ses habitudes, disponibilités et préférences.
Retourne uniquement un tableau JSON comme ceci :
[
  "Question 1",
  "Question 2",
  ...
]
EOT;

        $response = Http::withHeaders([
'Authorization' => 'Bearer ' . env('COHERE_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.cohere.ai/v1/generate', [
            'model' => 'command-r-plus',
            'prompt' => $prompt,
            'max_tokens' => 500,
            'temperature' => 0.7
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Erreur Cohere.'], 500);
        }

        $output = $response->json('generations.0.text');
        $start = strpos($output, '[');
        $end = strrpos($output, ']');

        if ($start === false || $end === false) {
            return response()->json(['error' => 'Format de réponse invalide.', 'raw' => $output], 422);
        }

        $json = json_decode(substr($output, $start, $end - $start + 1), true);

        if (!is_array($json)) {
            return response()->json(['error' => 'JSON invalide.', 'raw' => $output], 422);
        }

        return response()->json(['questions' => $json]);
    }

    public function generateChallengePlan(Request $request)
    {
        $goal = $request->input('objective');
        $answers = $request->input('answers', []);

        if (!$goal) {
            return response()->json(['error' => 'Objectif requis.'], 400);
        }

        $formattedAnswers = '';
        foreach ($answers as $index => $answer) {
            $formattedAnswers .= "Réponse " . ($index + 1) . ": " . $answer . "\n";
        }

        $prompt = <<<EOT
Tu es un coach personnel. Génère un plan de challenge quotidien pour atteindre l’objectif suivant : "$goal".

Voici les réponses de l'utilisateur à un questionnaire préalable :
$formattedAnswers

Choisis automatiquement une durée (30, 60 ou 90 jours).
Retourne uniquement un tableau JSON :
[
  {
    "jour": 1,
    "titre": "Nom de la tâche",
    "description": "Description de la tâche du jour"
  },
  ...
]
EOT;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('COHERE_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.cohere.ai/v1/generate', [
            'model' => 'command-r-plus',
            'prompt' => $prompt,
            'max_tokens' => 1800,
            'temperature' => 0.7
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Erreur de communication avec Cohere.'], 500);
        }

        $output = $response->json('generations.0.text');

        $startPos = strpos($output, '[');
        $endPos = strrpos($output, ']');

        if ($startPos === false || $endPos === false) {
            return response()->json([
                'error' => 'Impossible de détecter un tableau JSON dans la réponse.',
                'raw' => $output
            ], 422);
        }

        $jsonText = substr($output, $startPos, $endPos - $startPos + 1);
        $plan = json_decode($jsonText, true);

        if (!is_array($plan)) {
            return response()->json([
                'error' => 'Le JSON généré est invalide.',
                'raw' => $jsonText
            ], 422);
        }

        return response()->json([
            'plan' => $plan,
            'duration' => count($plan),
        ]);
    }
}
