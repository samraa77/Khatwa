<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPassword extends Notification
{
    public $token;
    public $email;

    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $url = 'http://localhost:5173/reset-password/' . $this->token . '?email=' . urlencode($this->email);

        return (new MailMessage)
            ->subject('Réinitialisation du mot de passe')
            ->line('Vous recevez ce message car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.')
            ->action('Réinitialiser le mot de passe', $url)
            ->line('Ce lien expirera dans 60 minutes.')
            ->line('Si vous n’avez pas demandé de réinitialisation, aucune action n’est requise.');
    }
}
