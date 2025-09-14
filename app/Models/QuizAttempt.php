<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\QuizAttempt
 *
 * @property int $id
 * @property int $enrollment_id
 * @property int $quiz_id
 * @property array $answers
 * @property int $score
 * @property int $total_questions
 * @property bool $is_passed
 * @property \Illuminate\Support\Carbon $started_at
 * @property \Illuminate\Support\Carbon|null $submitted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Enrollment $enrollment
 * @property-read \App\Models\Quiz $quiz
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt passed()
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt failed()
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt submitted()

 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt query()
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereAnswers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereEnrollmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereIsPassed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereQuizId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereSubmittedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereTotalQuestions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuizAttempt whereUpdatedAt($value)
 * 
 * @mixin \Eloquent
 */
class QuizAttempt extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'enrollment_id',
        'quiz_id',
        'answers',
        'score',
        'total_questions',
        'is_passed',
        'started_at',
        'submitted_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'answers' => 'array',
        'is_passed' => 'boolean',
        'started_at' => 'datetime',
        'submitted_at' => 'datetime',
    ];

    /**
     * Get the enrollment that owns the attempt.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    /**
     * Get the quiz that owns the attempt.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    /**
     * Scope a query to only include passed attempts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePassed($query)
    {
        return $query->where('is_passed', true);
    }

    /**
     * Scope a query to only include failed attempts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFailed($query)
    {
        return $query->where('is_passed', false);
    }

    /**
     * Scope a query to only include submitted attempts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSubmitted($query)
    {
        return $query->whereNotNull('submitted_at');
    }
}