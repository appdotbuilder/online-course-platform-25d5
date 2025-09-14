import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';

interface Course {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    is_free: boolean;
    teacher_name: string;
    total_lessons: number;
    created_at: string;
}

interface Props {
    featured_courses: Course[];
    stats: {
        total_courses: number;
        total_students: number;
        total_teachers: number;
        total_enrollments: number;
    };
    user_role?: string;
    [key: string]: unknown;
}

export default function LmsIndex({ featured_courses, stats, user_role }: Props) {
    const { auth } = usePage<SharedData>().props;

    const getDashboardRoute = () => {
        if (!auth.user) return null;
        
        switch (user_role) {
            case 'administrator':
                return route('admin.dashboard');
            case 'teacher':
                return route('teacher.dashboard');
            case 'student':
                return route('student.dashboard');
            default:
                return route('dashboard');
        }
    };

    const dashboardRoute = getDashboardRoute();

    return (
        <>
            <Head title="📚 EduPlatform - Learn Anything, Anywhere" />
            
            {/* Hero Section */}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
                <div className="container mx-auto px-4 py-8">
                    {/* Navigation */}
                    <nav className="flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">📚</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                EduPlatform
                            </span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <>
                                    {dashboardRoute && (
                                        <Link href={dashboardRoute}>
                                            <Button variant="outline">
                                                My Dashboard
                                            </Button>
                                        </Link>
                                    )}
                                    <Link href={route('lms.courses')}>
                                        <Button>
                                            Browse Courses
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')}>
                                        <Button variant="outline">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button>
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Hero Content */}
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Learn 📖 Teach 🎓 Grow 🚀
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            Join thousands of learners and educators in our comprehensive Learning Management System. 
                            Create courses, track progress, and achieve your educational goals.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            {auth.user ? (
                                <Link href={route('lms.courses')}>
                                    <Button size="lg" className="px-8 py-4 text-lg">
                                        🔍 Explore Courses
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={route('register')}>
                                    <Button size="lg" className="px-8 py-4 text-lg">
                                        🎯 Start Learning Today
                                    </Button>
                                </Link>
                            )}
                            
                            <Link href={route('lms.courses')}>
                                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                                    📚 View All Courses
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                {stats.total_courses}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">
                                📖 Courses Available
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                                {stats.total_students}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">
                                👨‍🎓 Active Students
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                {stats.total_teachers}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">
                                👩‍🏫 Expert Teachers
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                                {stats.total_enrollments}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">
                                🎓 Course Enrollments
                            </div>
                        </div>
                    </div>

                    {/* Featured Courses */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                🌟 Featured Courses
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Discover our most popular and highly-rated courses
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featured_courses.map((course) => (
                                <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-medium rounded-full">
                                                {course.category}
                                            </span>
                                            <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                                {course.is_free ? 'FREE' : `$${course.price}`}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {course.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                            {course.description}
                                        </p>
                                        
                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <span>👨‍🏫 {course.teacher_name}</span>
                                            <span>📝 {course.total_lessons} lessons</span>
                                        </div>
                                        
                                        <Link href={route('lms.course', course.id)}>
                                            <Button className="w-full">
                                                {course.is_free ? '🎯 Start Learning' : '💎 View Course'}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href={route('lms.courses')}>
                                <Button size="lg" variant="outline">
                                    📚 View All {stats.total_courses} Courses
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                ✨ Why Choose EduPlatform?
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Interactive Learning
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Engage with videos, quizzes, and hands-on projects designed for maximum retention.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Progress Tracking
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Monitor your learning journey with detailed progress reports and certificates.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="text-4xl mb-4">👥</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Expert Instructors
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Learn from industry professionals and experienced educators worldwide.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="text-4xl mb-4">🏆</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Certificates
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Earn verified certificates upon course completion to boost your career.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Mobile Friendly
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Learn anywhere, anytime with our responsive platform that works on all devices.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="text-4xl mb-4">💰</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Affordable Learning
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Access high-quality education at competitive prices, with many free courses available.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            🚀 Ready to Start Your Learning Journey?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Join our community of learners and take the first step towards achieving your goals.
                        </p>
                        {!auth.user && (
                            <Link href={route('register')}>
                                <Button size="lg" className="px-12 py-4 text-lg">
                                    🎓 Create Free Account
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}