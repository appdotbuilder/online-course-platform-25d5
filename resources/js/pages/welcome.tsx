import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    // Redirect to LMS index page
    useEffect(() => {
        router.visit(route('lms.index'));
    }, []);

    return (
        <>
            <Head title="📚 EduPlatform - Learn Anything, Anywhere">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-center shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <div className="text-6xl mb-6">📚</div>
                            <h1 className="mb-4 text-3xl font-bold">EduPlatform</h1>
                            <p className="mb-8 text-lg text-[#706f6c] dark:text-[#A1A09A]">
                                Loading your learning experience...
                            </p>
                            <div className="flex items-center justify-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 transition-colors"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-lg border border-indigo-600 px-6 py-2 text-indigo-600 hover:bg-indigo-50 transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-block rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
