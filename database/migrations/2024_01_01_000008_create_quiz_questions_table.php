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
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->id();
            $table->text('question');
            $table->json('options');
            $table->integer('correct_answer_index');
            $table->integer('points')->default(1);
            $table->integer('order_index')->default(0);
            $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            $table->index(['quiz_id', 'order_index']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_questions');
    }
};