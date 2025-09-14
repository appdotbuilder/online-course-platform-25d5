import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface Pagination {
    data: Course[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    courses: Pagination;
    categories: string[];
    filters: {
        search?: string;
        category?: string;
        price_filter?: string;
    };
    [key: string]: unknown;
}

export default function Courses({ courses, categories, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('lms.courses'), { 
            search: searchTerm,
            category: filters.category,
            price_filter: filters.price_filter,
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(route('lms.courses'), {
            search: filters.search,
            category: key === 'category' ? value : filters.category,
            price_filter: key === 'price_filter' ? value : filters.price_filter,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.get(route('lms.courses'));
    };

    return (
        <>
            <Head title="📚 Browse Courses - EduPlatform" />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <Link href={route('lms.index')} className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                                <span>←</span>
                                <span>Back to Home</span>
                            </Link>
                            
                            {auth.user && (
                                <Link href={route('dashboard')}>
                                    <Button variant="outline">
                                        My Dashboard
                                    </Button>
                                </Link>
                            )}
                        </div>
                        
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            📚 Explore Our Courses
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Discover {courses.total} courses across various categories
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    🔍 Search Courses
                                </label>
                                <form onSubmit={handleSearch} className="flex gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Search by title or description..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button type="submit">Search</Button>
                                </form>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📂 Category
                                </label>
                                <Select 
                                    value={filters.category || 'all'} 
                                    onValueChange={(value) => handleFilterChange('category', value === 'all' ? '' : value)}
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    💰 Price
                                </label>
                                <Select 
                                    value={filters.price_filter || 'all'} 
                                    onValueChange={(value) => handleFilterChange('price_filter', value === 'all' ? '' : value)}
                                >
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="free">Free</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            {(filters.search || filters.category || filters.price_filter) && (
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Course Grid */}
                    {courses.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {courses.data.map((course) => (
                                    <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-medium rounded-full">
                                                    {course.category}
                                                </span>
                                                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                                    {course.is_free ? 'FREE' : `$${course.price}`}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                {course.title}
                                            </h3>
                                            
                                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                                                {course.description}
                                            </p>
                                            
                                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                <span className="truncate">👨‍🏫 {course.teacher_name}</span>
                                                <span className="whitespace-nowrap ml-2">📝 {course.total_lessons} lessons</span>
                                            </div>
                                            
                                            <Link href={route('lms.course', course.id)}>
                                                <Button className="w-full">
                                                    {course.is_free ? '🎯 Start Learning' : '💎 View Details'}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {courses.last_page > 1 && (
                                <div className="flex items-center justify-center space-x-2">
                                    {courses.links.map((link, index) => {
                                        if (!link.url) {
                                            return (
                                                <span 
                                                    key={index} 
                                                    className="px-3 py-2 text-gray-400 dark:text-gray-600"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        }
                                        
                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                    link.active
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                No courses found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {filters.search || filters.category || filters.price_filter
                                    ? 'Try adjusting your search criteria or filters.'
                                    : 'No courses are available at the moment.'}
                            </p>
                            {(filters.search || filters.category || filters.price_filter) && (
                                <Button onClick={clearFilters}>
                                    Clear Filters & View All Courses
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}