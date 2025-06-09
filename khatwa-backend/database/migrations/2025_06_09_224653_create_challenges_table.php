<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('challenges', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('titre');
        $table->text('description')->nullable();
        $table->enum('difficulte', ['facile', 'moyenne', 'forte']);
        $table->enum('status', ['en_cours', 'termine', 'abandonne'])->default('en_cours');
        $table->integer('duree'); // en jours : 30, 60, 90
        $table->date('start_date')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('challenges');
    }
};
