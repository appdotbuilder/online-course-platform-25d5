<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    /**
     * Store a newly created enrollment.
     */
    public function store(Request $request, Course $course)
    {
        $user = Auth::user();

        if (!$user || !$user->isStudent()) {
            return redirect()->route('login')
                ->with('error', 'You must be logged in as a student to enroll in courses.');
        }

        // Check if already enrolled
        $existingEnrollment = Enrollment::where('student_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if ($existingEnrollment) {
            return redirect()->route('lms.course', $course)
                ->with('info', 'You are already enrolled in this course.');
        }

        // For paid courses, we would integrate payment gateway here
        // For now, we'll create enrollment directly for all courses
        Enrollment::create([
            'student_id' => $user->id,
            'course_id' => $course->id,
            'progress_percentage' => 0,
            'payment_data' => $course->isFree() ? null : [
                'amount' => $course->price,
                'currency' => 'USD',
                'status' => 'completed', // Simulated payment
                'gateway' => 'stripe',
            ],
        ]);

        return redirect()->route('student.dashboard')
            ->with('success', 'Successfully enrolled in ' . $course->title . '!');
    }

    /**
     * Display student's enrollments.
     */
    public function index()
    {
        $user = Auth::user();

        if (!$user || !$user->isStudent()) {
            abort(403, 'Access denied.');
        }

        $enrollments = Enrollment::where('student_id', $user->id)
            ->with(['course.teacher', 'course.modules.lessons'])
            ->latest()
            ->get()
            ->map(function ($enrollment) {
                return [
                    'id' => $enrollment->id,
                    'progress_percentage' => $enrollment->progress_percentage,
                    'is_completed' => $enrollment->is_completed,
                    'enrolled_at' => $enrollment->created_at?->format('M j, Y'),
                    'completed_at' => $enrollment->completed_at?->format('M j, Y'),
                    'course' => [
                        'id' => $enrollment->course->id,
                        'title' => $enrollment->course->title,
                        'category' => $enrollment->course->category,
                        'teacher_name' => $enrollment->course->teacher->name,
                        'total_lessons' => $enrollment->course->total_lessons,
                    ],
                ];
            });

        return Inertia::render('student/dashboard', [
            'enrollments' => $enrollments,
        ]);
    }
}