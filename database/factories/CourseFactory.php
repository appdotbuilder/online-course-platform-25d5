<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(3),
            'category' => fake()->randomElement([
                'Programming', 'Design', 'Business', 'Marketing', 
                'Data Science', 'Photography', 'Music', 'Health'
            ]),
            'price' => fake()->randomElement([0, 29.99, 49.99, 99.99, 199.99]),
            'status' => fake()->randomElement(['draft', 'published']),
            'scheduled_at' => fake()->optional(0.3)->dateTimeBetween('now', '+1 month'),
            'teacher_id' => User::factory()->teacher(),
        ];
    }

    /**
     * Indicate that the course is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
        ]);
    }

    /**
     * Indicate that the course is free.
     */
    public function free(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => 0,
        ]);
    }

    /**
     * Indicate that the course is premium.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => fake()->randomFloat(2, 100, 500),
        ]);
    }
}