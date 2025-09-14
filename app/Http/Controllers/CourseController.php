<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of courses.
     */
    public function index(Request $request)
    {
        $query = Course::published()->with(['teacher', 'modules.lessons']);

        if ($request->category) {
            $query->where('category', $request->category);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->price_filter === 'free') {
            $query->where('price', 0);
        } elseif ($request->price_filter === 'paid') {
            $query->where('price', '>', 0);
        }

        $courses = $query->paginate(12)->through(function ($course) {
            return [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'category' => $course->category,
                'price' => $course->price,
                'is_free' => $course->isFree(),
                'teacher_name' => $course->teacher->name,
                'total_lessons' => $course->total_lessons,
                'created_at' => $course->created_at?->format('M j, Y'),
            ];
        });

        $categories = Course::published()
            ->select('category')
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values();

        return Inertia::render('lms/courses', [
            'courses' => $courses,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'price_filter' => $request->price_filter,
            ],
        ]);
    }

    /**
     * Display the specified course.
     */
    public function show(Course $course)
    {
        $course->load(['teacher', 'modules.lessons', 'modules.quiz']);
        
        $user = auth()->user();
        $enrollment = null;
        $is_enrolled = false;

        if ($user && $user->isStudent()) {
            $enrollment = \App\Models\Enrollment::where('student_id', $user->id)
                ->where('course_id', $course->id)
                ->first();
            $is_enrolled = (bool) $enrollment;
        }

        return Inertia::render('lms/course-details', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'category' => $course->category,
                'price' => $course->price,
                'is_free' => $course->isFree(),
                'teacher' => [
                    'id' => $course->teacher->id,
                    'name' => $course->teacher->name,
                    'email' => $course->teacher->email,
                ],
                'modules' => $course->modules->map(function ($module) {
                    return [
                        'id' => $module->id,
                        'title' => $module->title,
                        'description' => $module->description,
                        'lessons_count' => $module->lessons->count(),
                        'has_quiz' => $module->quiz !== null,
                    ];
                }),
                'total_lessons' => $course->total_lessons,
                'total_modules' => $course->modules->count(),
                'created_at' => $course->created_at?->format('M j, Y'),
            ],
            'is_enrolled' => $is_enrolled,
            'enrollment_progress' => $enrollment->progress_percentage ?? 0,
        ]);
    }
}