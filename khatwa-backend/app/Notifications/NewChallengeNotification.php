<?php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\DatabaseMessage;
use App\Models\Challenge;

class NewChallengeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $challenge;

    public function __construct(Challenge $challenge)
    {
        $this->challenge = $challenge;
    }

    public function via($notifiable)
    {
        return ['database']; // Utilise le canal 'database'
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' => 'Un nouveau challenge a été créé : ' . $this->challenge->titre,
            'challenge_id' => $this->challenge->id,
            'duree' => $this->challenge->duree,
        ];
    }
}
