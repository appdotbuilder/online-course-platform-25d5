import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TeacherDashboard() {
    return (
        <AppShell>
            <Head title="Teacher Dashboard" />
            
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                👩‍🏫 Teacher Dashboard
                            </h1>
                            <p className="text-green-100 text-lg">
                                Manage your courses, view student progress, and create engaging content
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">🚧</div>
                            <div className="text-green-100">Coming Soon</div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-lg">
                                📚 My Courses
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                Coming Soon
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-lg">
                                👨‍🎓 Students
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                Coming Soon
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-lg">
                                📊 Revenue
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">
                                Coming Soon
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-lg">
                                ⭐ Rating
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                Coming Soon
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Teacher Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                📖 Course Management
                            </CardTitle>
                            <CardDescription>
                                Create and manage your courses
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Create new courses
                                • Manage modules and lessons
                                • Upload videos and materials
                                • Set course pricing
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                🧪 Quiz & Assessment
                            </CardTitle>
                            <CardDescription>
                                Create quizzes and track results
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Create multiple-choice quizzes
                                • Auto-grading system
                                • View student scores
                                • Set passing criteria
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                👥 Student Management
                            </CardTitle>
                            <CardDescription>
                                Monitor student progress
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • View enrolled students
                                • Track learning progress
                                • Send messages
                                • Award certificates
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                📊 Analytics & Reports
                            </CardTitle>
                            <CardDescription>
                                Detailed performance insights
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Course completion rates
                                • Student engagement metrics
                                • Revenue analytics
                                • Export reports
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                🎥 Content Creation
                            </CardTitle>
                            <CardDescription>
                                Rich content authoring tools
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Video upload & streaming
                                • Rich text editor
                                • File attachments
                                • Interactive elements
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                📅 Scheduling
                            </CardTitle>
                            <CardDescription>
                                Course scheduling and publishing
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Schedule course releases
                                • Draft/published status
                                • Enrollment deadlines
                                • Content drip-feeding
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>
                </div>

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