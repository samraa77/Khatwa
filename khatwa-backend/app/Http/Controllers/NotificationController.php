<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        // Exemple simple : retourne toutes les notifications non lues de l'utilisateur
        return $request->user()->unreadNotifications;
    }
}
