import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../../../service/quizservice';
//import { Router } from 'express';

@Component({
  selector: 'app-quiz',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {
  validateForm!:FormGroup;
  constructor(private fb:FormBuilder,private quizService:QuizService,private router:Router ){
    this.validateForm=this.fb.group({
       title:['',Validators.required],
      description:['',Validators.required]
    })
  }
   submitForm(): void {
    if (this.validateForm.invalid) {
        alert('Please fill out all required fields.');
        return;
    }
    console.log('Payload:', {
        title: this.validateForm.value.title,
        description: this.validateForm.value.description
    });
    // This payload matches QuizCreateDto exactly
    const quizPayload = {
        title: this.validateForm.value.title,
        description: this.validateForm.value.description
    };

    this.quizService.register(quizPayload).subscribe({
        next: (response) => {
            alert('Quiz created successfully!');
            this.router.navigate(['/admin']);
        },
        error: (error) => {
            console.error('Registration Failed', error);
            alert('Failed to save quiz. Check backend logs.');
        }
    });
}
}
