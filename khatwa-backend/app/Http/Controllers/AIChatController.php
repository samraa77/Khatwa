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
}
