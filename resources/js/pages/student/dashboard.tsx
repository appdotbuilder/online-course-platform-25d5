import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Enrollment {
    id: number;
    progress_percentage: number;
    is_completed: boolean;
    enrolled_at: string;
    completed_at?: string;
    course: {
        id: number;
        title: string;
        category: string;
        teacher_name: string;
        total_lessons: number;
    };
}

interface Props {
    enrollments: Enrollment[];
    [key: string]: unknown;
}

export default function StudentDashboard({ enrollments }: Props) {
    const inProgressCourses = enrollments.filter(e => !e.is_completed);
    const completedCourses = enrollments.filter(e => e.is_completed);

    return (
        <AppShell>
            <Head title="Student Dashboard" />
            
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                👨‍🎓 Welcome to Your Learning Dashboard
                            </h1>
                            <p className="text-indigo-100 text-lg">
                                Continue your learning journey and achieve your goals!
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{enrollments.length}</div>
                            <div className="text-indigo-100">Enrolled Courses</div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-lg">
                                📖 In Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {inProgressCourses.length}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-lg">
                                🏆 Completed
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {completedCourses.length}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-lg">
                                📊 Avg Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">
                                {enrollments.length > 0 
                                    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress_percentage, 0) / enrollments.length)
                                    : 0
                                }%
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Current Courses */}
                {inProgressCourses.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                📚 Continue Learning
                            </CardTitle>
                            <CardDescription>
                                Pick up where you left off
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {inProgressCourses.map((enrollment) => (
                                    <div key={enrollment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg mb-1">
                                                    {enrollment.course.title}
                                                </h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <span>📂 {enrollment.course.category}</span>
                                                    <span>👨‍🏫 {enrollment.course.teacher_name}</span>
                                                    <span>📝 {enrollment.course.total_lessons} lessons</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-blue-600 mb-1">
                                                    {enrollment.progress_percentage}%
                                                </div>
                                                <Link href={route('student.course', enrollment.course.id)}>
                                                    <Button size="sm">
                                                        Continue
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                        <Progress value={enrollment.progress_percentage} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Completed Courses */}
                {completedCourses.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                🏆 Completed Courses
                            </CardTitle>
                            <CardDescription>
                                Great job! You've completed these courses
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {completedCourses.map((enrollment) => (
                                    <div key={enrollment.id} className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="text-lg">🏅</div>
                                            <div className="text-xs text-gray-500">
                                                {enrollment.completed_at}
                                            </div>
                                        </div>
                                        <h3 className="font-semibold mb-1">
                                            {enrollment.course.title}
                                        </h3>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            {enrollment.course.category} • {enrollment.course.teacher_name}
                                        </div>
                                        <Link href={route('student.certificate', enrollment.id)}>
                                            <Button size="sm" variant="outline" className="w-full">
                                                📄 View Certificate
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {enrollments.length === 0 && (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Start Your Learning Journey
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                You haven't enrolled in any courses yet. Browse our catalog and find something interesting!
                            </p>
                            <Link href={route('lms.courses')}>
                                <Button size="lg" className="px-8">
                                    🔍 Browse Courses
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={route('lms.courses')}>
                        <Button variant="outline" className="w-full sm:w-auto">
                            🔍 Browse All Courses
                        </Button>
                    </Link>
                    <Link href={route('lms.index')}>
                        <Button variant="outline" className="w-full sm:w-auto">
                            🏠 Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}