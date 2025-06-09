<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Challenge;
use App\Models\ChallengeDay;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // 1. Progression du challenge en cours
        $activeChallenge = Challenge::where('user_id', $user->id)
            ->where('status', 'en_cours')
            ->latest()
            ->first();

        $completedDays = 0;
        $totalDays = 0;
        $currentStreak = 0;

        if ($activeChallenge) {
            $days = ChallengeDay::where('challenge_id', $activeChallenge->id)->orderBy('day_number')->get();
            $totalDays = $days->count();
            $completedDays = $days->where('is_completed', true)->count();

            // Streak = jours consécutifs complétés (de 1 à N)
            foreach ($days as $day) {
                if ($day->is_completed) {
                    $currentStreak++;
                } else {
                    break;
                }
            }
        }

        $progressPercentage = $totalDays > 0 ? round(($completedDays / $totalDays) * 100) : 0;

        // 2. Répartition des challenges
        $totalChallenges = Challenge::where('user_id', $user->id)->count();
        $completed = Challenge::where('user_id', $user->id)->where('status', 'termine')->count();
        $inProgress = Challenge::where('user_id', $user->id)->where('status', 'en_cours')->count();
        $abandoned = Challenge::where('user_id', $user->id)->where('status', 'abandonne')->count();

        $distribution = [
            'completed' => ['value' => $completed, 'percentage' => $totalChallenges ? round(($completed / $totalChallenges) * 100) : 0, 'color' => '#2ecc71'],
            'inProgress' => ['value' => $inProgress, 'percentage' => $totalChallenges ? round(($inProgress / $totalChallenges) * 100) : 0, 'color' => '#3498db'],
            'abandoned' => ['value' => $abandoned, 'percentage' => $totalChallenges ? round(($abandoned / $totalChallenges) * 100) : 0, 'color' => '#e74c3c'],
            'total' => $totalChallenges,
            'successRate' => $totalChallenges ? round(($completed / $totalChallenges) * 100) : 0,
        ];

        // 3. Durée des défis
        $durations = [30, 60, 90];
        $durationStats = [];
        foreach ($durations as $duration) {
            $count = Challenge::where('user_id', $user->id)->where('duration_days', $duration)->count();
            $durationStats[] = [
                'duration' => $duration . ' J',
                'challenges' => $count,
                'percentage' => $totalChallenges ? round(($count / $totalChallenges) * 100) : 0,
                'color' => match ($duration) {
                    30 => '#3498db',
                    60 => '#f39c12',
                    90 => '#e74c3c',
                }
            ];
        }

        // 4. Discipline quotidienne (score fictif de démonstration ici)
        $dailyDiscipline = [
            ['day' => 'L', 'score' => 80],
            ['day' => 'M', 'score' => 75],
            ['day' => 'M', 'score' => 85],
            ['day' => 'J', 'score' => 90],
            ['day' => 'V', 'score' => 88],
            ['day' => 'S', 'score' => 92],
            ['day' => 'D', 'score' => 89],
        ];

        $averageScore = round(array_sum(array_column($dailyDiscipline, 'score')) / count($dailyDiscipline));

        return response()->json([
            'progress' => [
                'completedDays' => $completedDays,
                'totalDays' => $totalDays,
                'currentStreak' => $currentStreak,
                'progressPercentage' => $progressPercentage
            ],
            'distribution' => $distribution,
            'durations' => $durationStats,
            'discipline' => [
                'dailyScores' => $dailyDiscipline,
                'average' => $averageScore
            ],
            'user' => $user->only(['prenom', 'nom', 'email'])
        ]);
    }
}
