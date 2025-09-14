<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\LmsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// LMS Routes (public)
Route::get('/', [LmsController::class, 'index'])->name('lms.index');
Route::get('/courses', [CourseController::class, 'index'])->name('lms.courses');
Route::get('/course/{course}', [CourseController::class, 'show'])->name('lms.course');

// Enrollment routes (authenticated students only)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/enroll/{course}', [EnrollmentController::class, 'store'])->name('enrollment.store');
});

// Student Dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/student/dashboard', [EnrollmentController::class, 'index'])->name('student.dashboard');
    
    // Placeholder routes for now
    Route::get('/student/course/{course}', function ($course) {
        return Inertia::render('student/course-learning', ['course_id' => $course]);
    })->name('student.course');
    
    Route::get('/student/certificate/{enrollment}', function ($enrollment) {
        return Inertia::render('student/certificate', ['enrollment_id' => $enrollment]);
    })->name('student.certificate');
});

// Role-based dashboard routing
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        switch ($user->role) {
            case 'administrator':
                return redirect()->route('admin.dashboard');
            case 'teacher':
                return redirect()->route('teacher.dashboard');
            case 'student':
                return redirect()->route('student.dashboard');
            default:
                return Inertia::render('dashboard');
        }
    })->name('dashboard');
    
    // Placeholder dashboard routes
    Route::get('/admin/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');
    
    Route::get('/teacher/dashboard', function () {
        return Inertia::render('teacher/dashboard');
    })->name('teacher.dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
