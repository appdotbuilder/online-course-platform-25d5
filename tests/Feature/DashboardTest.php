<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users are redirected from dashboard based on role', function () {
    $student = User::factory()->student()->create();
    $this->actingAs($student);
    $this->get('/dashboard')->assertRedirect('/student/dashboard');
    
    $teacher = User::factory()->teacher()->create();
    $this->actingAs($teacher);
    $this->get('/dashboard')->assertRedirect('/teacher/dashboard');
    
    $admin = User::factory()->administrator()->create();
    $this->actingAs($admin);
    $this->get('/dashboard')->assertRedirect('/admin/dashboard');
});
