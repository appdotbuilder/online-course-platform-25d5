import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                👨‍💼 Administrator Dashboard
                            </h1>
                            <p className="text-red-100 text-lg">
                                Manage users, courses, monitor system performance, and generate reports
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">🚧</div>
                            <div className="text-red-100">Coming Soon</div>
                        </div>
                    </div>
                </div>

                {/* System Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-lg">
                                👥 Total Users
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
                                📚 Total Courses
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
                                🎓 Enrollments
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
                                💰 Revenue
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                Coming Soon
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Admin Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                👥 User Management
                            </CardTitle>
                            <CardDescription>
                                Manage all system users
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Create/edit/delete users
                                • Assign roles (admin, teacher, student)
                                • Activate/deactivate accounts
                                • Reset passwords
                                • Bulk user operations
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
                                Comprehensive system reports
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • User activity reports
                                • Course performance metrics
                                • Registration statistics
                                • Revenue analytics
                                • Export to CSV/Excel
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                📚 Course Oversight
                            </CardTitle>
                            <CardDescription>
                                Monitor all courses
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • View all courses
                                • Approve/reject courses
                                • Monitor content quality
                                • Manage categories
                                • Set platform policies
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                🎓 Student Progress
                            </CardTitle>
                            <CardDescription>
                                System-wide learning analytics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Completion rates
                                • Top performing students
                                • Learning patterns
                                • Certificate issuance
                                • Engagement metrics
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                💳 Payment Management
                            </CardTitle>
                            <CardDescription>
                                Financial transaction oversight
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Payment gateway settings
                                • Transaction monitoring
                                • Refund management
                                • Revenue distribution
                                • Financial reports
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                📧 Communication Tools
                            </CardTitle>
                            <CardDescription>
                                Platform-wide messaging
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Broadcast announcements
                                • Email campaigns
                                • System notifications
                                • User support tickets
                                • Newsletter management
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                ⚙️ System Settings
                            </CardTitle>
                            <CardDescription>
                                Platform configuration
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Platform settings
                                • Feature toggles
                                • Security settings
                                • Backup management
                                • Performance monitoring
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                📁 Data Management
                            </CardTitle>
                            <CardDescription>
                                Import/Export capabilities
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Bulk user import
                                • Data export (CSV/Excel)
                                • Database backups
                                • Historical data retention
                                • GDPR compliance tools
                            </p>
                            <Button disabled className="w-full">
                                🚧 Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                🔒 Security & Compliance
                            </CardTitle>
                            <CardDescription>
                                Platform security management
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                • Access logs
                                • Security audit trails
                                • User permissions
                                • Data privacy settings
                                • Compliance reporting
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