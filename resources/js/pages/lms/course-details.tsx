import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { type SharedData } from '@/types';

interface Course {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    is_free: boolean;
    teacher: {
        id: number;
        name: string;
        email: string;
    };
    modules: Array<{
        id: number;
        title: string;
        description?: string;
        lessons_count: number;
        has_quiz: boolean;
    }>;
    total_lessons: number;
    total_modules: number;
    created_at: string;
}

interface Props {
    course: Course;
    is_enrolled: boolean;
    enrollment_progress: number;
    [key: string]: unknown;
}

export default function CourseDetails({ course, is_enrolled, enrollment_progress }: Props) {
    const { auth } = usePage<SharedData>().props;

    const handleEnroll = () => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }

        if (auth.user.role !== 'student') {
            alert('Only students can enroll in courses.');
            return;
        }

        router.post(route('enrollment.store', course.id), {}, {
            onSuccess: () => {
                // Redirect will be handled by the controller
            },
            onError: (errors) => {
                console.error('Enrollment failed:', errors);
            }
        });
    };

    return (
        <>
            <Head title={`${course.title} - EduPlatform`} />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8">
                    {/* Navigation */}
                    <div className="flex items-center justify-between mb-8">
                        <Link href={route('lms.courses')} className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                            <span>←</span>
                            <span>Back to Courses</span>
                        </Link>
                        
                        {auth.user && (
                            <Link href={route('dashboard')}>
                                <Button variant="outline">
                                    My Dashboard
                                </Button>
                            </Link>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Course Header */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-medium rounded-full">
                                                {course.category}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                Created {course.created_at}
                                            </span>
                                        </div>
                                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                            {course.title}
                                        </h1>
                                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {course.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Course Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                            {course.total_modules}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            📚 Modules
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                                            {course.total_lessons}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            📝 Lessons
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                                            {course.modules.filter(m => m.has_quiz).length}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            🧪 Quizzes
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                                            {course.is_free ? 'FREE' : `$${course.price}`}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            💰 Price
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Course Modules */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        📚 Course Content
                                    </CardTitle>
                                    <CardDescription>
                                        {course.total_modules} modules • {course.total_lessons} lessons
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {course.modules.map((module, index) => (
                                            <div key={module.id} className="border rounded-lg p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg mb-1">
                                                            Module {index + 1}: {module.title}
                                                        </h3>
                                                        {module.description && (
                                                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                                                                {module.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <span>📝 {module.lessons_count} lessons</span>
                                                    {module.has_quiz && (
                                                        <span>🧪 Quiz included</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Instructor */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        👨‍🏫 Your Instructor
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                            {course.teacher.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                                {course.teacher.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Experienced educator and industry professional
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <Card>
                                    <CardContent className="p-8">
                                        {is_enrolled ? (
                                            <div className="space-y-6">
                                                <div className="text-center">
                                                    <div className="text-3xl mb-2">🎓</div>
                                                    <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                                                        Enrolled!
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                        Continue your learning journey
                                                    </p>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Progress
                                                        </span>
                                                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                                            {enrollment_progress}%
                                                        </span>
                                                    </div>
                                                    <Progress value={enrollment_progress} className="h-3" />
                                                </div>

                                                <div className="space-y-3">
                                                    <Link href={route('student.course', course.id)}>
                                                        <Button className="w-full">
                                                            📚 Continue Learning
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('student.dashboard')}>
                                                        <Button variant="outline" className="w-full">
                                                            📊 View Dashboard
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <div className="text-center">
                                                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                                        {course.is_free ? 'FREE' : `$${course.price}`}
                                                    </div>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        {course.is_free ? 'Free Course' : 'One-time payment'}
                                                    </p>
                                                </div>

                                                <div className="space-y-3">
                                                    {auth.user ? (
                                                        <Button 
                                                            onClick={handleEnroll}
                                                            className="w-full"
                                                            size="lg"
                                                        >
                                                            {course.is_free ? '🎯 Enroll Now' : '💳 Buy Now'}
                                                        </Button>
                                                    ) : (
                                                        <div className="space-y-3">
                                                            <Link href={route('register')}>
                                                                <Button className="w-full" size="lg">
                                                                    🎓 Sign Up to Enroll
                                                                </Button>
                                                            </Link>
                                                            <Link href={route('login')}>
                                                                <Button variant="outline" className="w-full">
                                                                    Already have an account?
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="pt-4 border-t">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                                        ✨ This course includes:
                                                    </h4>
                                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <li className="flex items-center">
                                                            <span className="mr-2">📹</span>
                                                            Video lessons
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="mr-2">📄</span>
                                                            Downloadable resources
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="mr-2">🧪</span>
                                                            Interactive quizzes
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="mr-2">🏆</span>
                                                            Certificate of completion
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="mr-2">♾️</span>
                                                            Lifetime access
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="mr-2">📱</span>
                                                            Mobile friendly
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}