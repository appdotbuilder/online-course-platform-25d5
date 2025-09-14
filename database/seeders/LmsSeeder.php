<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\Module;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@eduplatform.com'],
            [
                'name' => 'Admin User',
                'role' => 'administrator',
                'is_active' => true,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create teachers
        $teachers = collect();
        for ($i = 1; $i <= 5; $i++) {
            $teachers->push(User::firstOrCreate(
                ['email' => "teacher{$i}@eduplatform.com"],
                [
                    'name' => "Teacher {$i}",
                    'role' => 'teacher',
                    'is_active' => true,
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            ));
        }

        // Create students
        $students = collect();
        for ($i = 1; $i <= 20; $i++) {
            $students->push(User::firstOrCreate(
                ['email' => "student{$i}@eduplatform.com"],
                [
                    'name' => "Student {$i}",
                    'role' => 'student',
                    'is_active' => true,
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            ));
        }

        // Sample courses data
        $coursesData = [
            [
                'title' => 'Complete Web Development Bootcamp',
                'description' => 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build 10 real-world projects and become a full-stack developer.',
                'category' => 'Programming',
                'price' => 199.99,
                'status' => 'published',
                'modules' => [
                    [
                        'title' => 'HTML & CSS Fundamentals',
                        'lessons' => [
                            ['title' => 'Introduction to HTML', 'type' => 'video', 'duration' => 45],
                            ['title' => 'CSS Styling Basics', 'type' => 'video', 'duration' => 60],
                            ['title' => 'Building Your First Webpage', 'type' => 'article', 'duration' => 30],
                        ]
                    ],
                    [
                        'title' => 'JavaScript Programming',
                        'lessons' => [
                            ['title' => 'JavaScript Variables and Functions', 'type' => 'video', 'duration' => 50],
                            ['title' => 'DOM Manipulation', 'type' => 'video', 'duration' => 40],
                            ['title' => 'Async JavaScript', 'type' => 'video', 'duration' => 55],
                        ]
                    ]
                ]
            ],
            [
                'title' => 'Digital Marketing Mastery',
                'description' => 'Master SEO, Social Media Marketing, Google Ads, Content Marketing, and Email Marketing strategies.',
                'category' => 'Marketing',
                'price' => 149.99,
                'status' => 'published',
                'modules' => [
                    [
                        'title' => 'SEO Fundamentals',
                        'lessons' => [
                            ['title' => 'Introduction to SEO', 'type' => 'video', 'duration' => 35],
                            ['title' => 'Keyword Research', 'type' => 'video', 'duration' => 45],
                        ]
                    ]
                ]
            ],
            [
                'title' => 'Graphic Design with Photoshop',
                'description' => 'Learn professional graphic design techniques using Adobe Photoshop. Create logos, posters, and digital art.',
                'category' => 'Design',
                'price' => 99.99,
                'status' => 'published',
                'modules' => [
                    [
                        'title' => 'Photoshop Basics',
                        'lessons' => [
                            ['title' => 'Interface Overview', 'type' => 'video', 'duration' => 25],
                            ['title' => 'Working with Layers', 'type' => 'video', 'duration' => 40],
                        ]
                    ]
                ]
            ],
            [
                'title' => 'Introduction to Python Programming',
                'description' => 'Start your programming journey with Python. Perfect for beginners with no coding experience.',
                'category' => 'Programming',
                'price' => 0, // Free course
                'status' => 'published',
                'modules' => [
                    [
                        'title' => 'Getting Started with Python',
                        'lessons' => [
                            ['title' => 'What is Python?', 'type' => 'article', 'duration' => 15],
                            ['title' => 'Installing Python', 'type' => 'video', 'duration' => 20],
                            ['title' => 'Your First Python Program', 'type' => 'video', 'duration' => 30],
                        ]
                    ],
                    [
                        'title' => 'Variables and Data Types',
                        'lessons' => [
                            ['title' => 'Understanding Variables', 'type' => 'video', 'duration' => 25],
                            ['title' => 'Working with Numbers', 'type' => 'video', 'duration' => 35],
                        ]
                    ]
                ]
            ],
            [
                'title' => 'Business Management Essentials',
                'description' => 'Learn fundamental business management principles, leadership skills, and strategic planning.',
                'category' => 'Business',
                'price' => 79.99,
                'status' => 'published',
                'modules' => [
                    [
                        'title' => 'Leadership Fundamentals',
                        'lessons' => [
                            ['title' => 'What Makes a Great Leader?', 'type' => 'video', 'duration' => 40],
                            ['title' => 'Team Management', 'type' => 'video', 'duration' => 45],
                        ]
                    ]
                ]
            ],
        ];

        // Create courses with modules and lessons
        foreach ($coursesData as $courseData) {
            $teacher = $teachers->random();
            
            $course = Course::firstOrCreate(
                [
                    'title' => $courseData['title'],
                    'teacher_id' => $teacher->id,
                ],
                [
                    'description' => $courseData['description'],
                    'category' => $courseData['category'],
                    'price' => $courseData['price'],
                    'status' => $courseData['status'],
                ]
            );

            // Create modules and lessons
            foreach ($courseData['modules'] as $moduleIndex => $moduleData) {
                $module = Module::firstOrCreate([
                    'title' => $moduleData['title'],
                    'course_id' => $course->id,
                    'order_index' => $moduleIndex,
                ]);

                foreach ($moduleData['lessons'] as $lessonIndex => $lessonData) {
                    Lesson::firstOrCreate([
                        'title' => $lessonData['title'],
                        'module_id' => $module->id,
                        'order_index' => $lessonIndex,
                    ], [
                        'content' => 'Sample lesson content for ' . $lessonData['title'],
                        'type' => $lessonData['type'],
                        'duration_minutes' => $lessonData['duration'],
                    ]);
                }

                // Add a quiz to some modules
                if (random_int(0, 1)) {
                    $quiz = Quiz::firstOrCreate([
                        'module_id' => $module->id,
                    ], [
                        'title' => $moduleData['title'] . ' Quiz',
                        'description' => 'Test your knowledge of ' . $moduleData['title'],
                        'time_limit_minutes' => 30,
                        'passing_score' => 70,
                    ]);

                    // Add sample questions
                    $questions = [
                        [
                            'question' => 'What is the most important concept in ' . $moduleData['title'] . '?',
                            'options' => ['Option A', 'Option B', 'Option C', 'Option D'],
                            'correct_answer' => 0,
                        ],
                        [
                            'question' => 'Which of the following is a best practice?',
                            'options' => ['Practice A', 'Practice B', 'Practice C', 'Practice D'],
                            'correct_answer' => 1,
                        ],
                    ];

                    foreach ($questions as $questionIndex => $questionData) {
                        QuizQuestion::firstOrCreate([
                            'quiz_id' => $quiz->id,
                            'order_index' => $questionIndex,
                        ], [
                            'question' => $questionData['question'],
                            'options' => $questionData['options'],
                            'correct_answer_index' => $questionData['correct_answer'],
                            'points' => 10,
                        ]);
                    }
                }
            }
        }

        // Create some sample enrollments
        $courses = Course::all();
        $sampleStudents = $students->take(10);

        foreach ($sampleStudents as $student) {
            $enrollmentCount = random_int(1, 3);
            $randomCourses = $courses->random($enrollmentCount);

            foreach ($randomCourses as $course) {
                Enrollment::firstOrCreate([
                    'student_id' => $student->id,
                    'course_id' => $course->id,
                ], [
                    'progress_percentage' => random_int(0, 100),
                    'is_completed' => fake()->boolean(30),
                    'completed_at' => fake()->optional(0.3)->dateTimeThisMonth(),
                ]);
            }
        }

        $this->command->info('LMS sample data created successfully!');
    }
}