<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LmsController extends Controller
{
    /**
     * Display the LMS homepage.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Get public courses for unauthenticated users or students
        $featuredCourses = Course::published()
            ->with(['teacher', 'modules.lessons'])
            ->take(6)
            ->get()
            ->map(function ($course) {
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

        $stats = [
            'total_courses' => Course::published()->count(),
            'total_students' => User::students()->active()->count(),
            'total_teachers' => User::teachers()->active()->count(),
            'total_enrollments' => Enrollment::count(),
        ];

        return Inertia::render('lms/index', [
            'featured_courses' => $featuredCourses,
            'stats' => $stats,
            'user_role' => $user?->role,
        ]);
    }


}