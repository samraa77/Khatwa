<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('notifications')->insert([
            [
                'id' => (string) Str::uuid(),
                'type' => 'App\Notifications\NewChallengeNotification',
                'notifiable_type' => 'App\Models\User',
                'notifiable_id' => 1,
                'data' => json_encode([
                    'titre' => 'Challenge test 1',
                    'message' => 'Notification de test 1'
                ]),
                'read_at' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => (string) Str::uuid(),
                'type' => 'App\Notifications\NewChallengeNotification',
                'notifiable_type' => 'App\Models\User',
                'notifiable_id' => 1,
                'data' => json_encode([
                    'titre' => 'Challenge test 2',
                    'message' => 'Notification de test 2'
                ]),
                'read_at' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => (string) Str::uuid(),
                'type' => 'App\Notifications\NewChallengeNotification',
                'notifiable_type' => 'App\Models\User',
                'notifiable_id' => 1,
                'data' => json_encode([
                    'titre' => 'Challenge test 3',
                    'message' => 'Notification de test 3'
                ]),
                'read_at' => null,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
