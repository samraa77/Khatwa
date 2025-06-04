<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use Notifiable;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'age',
        'pays',
        'language',
        'opinion',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * JWT methods
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Hash password automatically
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
