import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../../service/admin-service';

@Component({
  selector: 'app-questions',
  imports: [ReactiveFormsModule],
  templateUrl: './questions.html',
  styleUrl: './questions.css',
})
export class Questions implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionService: AdminService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      quiz: ['', [Validators.required]],
      questionType: ['single', [Validators.required]], // 'single' (radio), 'multiple' (checkbox), 'boolean' (true/false)
      questionText: ['', [Validators.required]],
      marks: [null, [Validators.required, Validators.min(1)]],
      options: this.fb.array([]),
    });

    // Handle structural changes when user changes the question type
    this.validateForm.get('questionType')?.valueChanges.subscribe((type) => {
      this.handleTypeChange(type);
    });

    // Default configuration (Single choice with 4 options)
    this.handleTypeChange('single');
  }

  get optionsArray(): FormArray {
    return this.validateForm.get('options') as FormArray;
  }

  // Adjusts the options structure based on selected type
  private handleTypeChange(type: string): void {
    this.optionsArray.clear(); // Clear existing options

    if (type === 'boolean') {
      // True / False always demands exactly two options
      this.optionsArray.push(this.createOptionGroup('True'));
      this.optionsArray.push(this.createOptionGroup('False'));
    } else {
      // Default to 4 slots for single or multiple choice layout
      for (let i = 0; i < 4; i++) {
        this.optionsArray.push(this.createOptionGroup(''));
      }
    }
  }

  private createOptionGroup(initialText: string = ''): FormGroup {
    return this.fb.group({
      optionText: [initialText, [Validators.required]],
      isCorrect: [false]
    });
  }

  // Manually enforces single-selection (radio logic) across FormArray booleans
  onRadioSelect(selectedIndex: number): void {
    this.optionsArray.controls.forEach((control, index) => {
      control.get('isCorrect')?.setValue(index === selectedIndex);
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const quizId = this.validateForm.value.quiz;
      
      const payload = {
        questionType: this.validateForm.value.questionType,
        questionText: this.validateForm.value.questionText,
        marks: this.validateForm.value.marks,
        options: this.validateForm.value.options 
      };

      this.questionService.addQuestionToQuiz(quizId, payload).subscribe({
        next: (response) => {
          alert('Question saved successfully!');
          this.validateForm.reset({ questionType: 'single' }); // Reset back to default template setup
          this.router.navigate(['/admindash']);
        },
        error: (err) => console.error('Error preserving question:', err)
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsTouched();
        if (control instanceof FormArray) {
          control.controls.forEach(c => c.markAsTouched());
        }
      });
    }
  }
}