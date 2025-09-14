<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\LessonProgress
 *
 * @property int $id
 * @property int $enrollment_id
 * @property int $lesson_id
 * @property bool $is_completed
 * @property int $last_position_seconds
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Enrollment $enrollment
 * @property-read \App\Models\Lesson $lesson
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress completed()

 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress query()
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress whereEnrollmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress whereIsCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress whereLastPositionSeconds($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress whereLessonId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LessonProgress whereUpdatedAt($value)
 * 
 * @mixin \Eloquent
 */
class LessonProgress extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'enrollment_id',
        'lesson_id',
        'is_completed',
        'last_position_seconds',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_completed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the enrollment that owns the progress.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    /**
     * Get the lesson that owns the progress.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    /**
     * Scope a query to only include completed progress.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('is_completed', true);
    }
}