import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../../../service/admin-service';
import { Viewquestions } from '../viewquestions/viewquestions';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questions.html',
  styleUrls: ['./questions.css']
})
export class AddQuestions implements OnInit {

  validateForm!: FormGroup;
  quizzes: any[] = [];
  loading = true;
  submitted=false;

  constructor(
    private fb: FormBuilder,
    private questionService: AdminService,
    private router: Router,
    private cdf:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      quiz: ['', Validators.required],
      questionType: ['single', Validators.required],
      questionText: ['', Validators.required],
      marks: [null, [Validators.required, Validators.min(1)]],
      options: this.fb.array([])
      
    });
    this.validateForm.get('quiz')?.valueChanges.subscribe(value => {
  console.log('Selected Quiz:', value);
});

    this.loadQuizzes();

    // Load quiz list from backend
    this.validateForm.get('questionType')?.valueChanges.subscribe(type => {
      this.handleTypeChange(type);
    });

    this.handleTypeChange('single');
  }

  // Fetch quizzes
  loadQuizzes(): void {
  this.questionService.getAllQuiz().subscribe({
    next: (res: any) => {
      console.log("Full Response:", res);
      console.log("Data:", res.data);
      console.log("Is Array:", Array.isArray(res.data));

      this.quizzes = res.data;
      this.cdf.detectChanges();
      console.log("Quizzes Length:", this.quizzes.length);
    },
    error: (err) => console.error(err)
  });
}

  get optionsArray(): FormArray {
    return this.validateForm.get('options') as FormArray;
  }
  
  private handleTypeChange(type: string): void {

  this.optionsArray.clear();

  if (type === 'boolean') {

    this.optionsArray.push(
      this.fb.group({
        optionText: ['True'],
        isCorrect: [true]
      })
    );

    this.optionsArray.push(
      this.fb.group({
        optionText: ['False'],
        isCorrect: [false]
      })
    );

  } else {

    for (let i = 0; i < 4; i++) {

      this.optionsArray.push(
        this.fb.group({
          optionText: ['', Validators.required],
          isCorrect: [false]
        })
      );

    }

  }

}

  private createOptionGroup(text: string = ''): FormGroup {

    return this.fb.group({
      optionText: [text, Validators.required],
      isCorrect: [false]
    });

  }

  onRadioSelect(index: number): void {

    this.optionsArray.controls.forEach((control, i) => {
      control.get('isCorrect')?.setValue(i === index);
    });

  }

  submitForm(): void {

  this.submitted = true;

  if (this.validateForm.invalid) {
    return;
  }

  const quizId = this.validateForm.value.quiz;

  const payload = {
    questionType: this.validateForm.value.questionType,
    questionText: this.validateForm.value.questionText,
    marks: this.validateForm.value.marks,
    options: this.validateForm.value.options
  };

  this.questionService.addQuestionToQuiz(quizId, payload).subscribe({

    next: () => {

      alert("Question Added Successfully");

      this.validateForm.reset({
        quiz: '',
        questionType: 'single'
      });

      this.submitted = false;

      this.handleTypeChange('single');
      
      this.router.navigate(['/admin/questions']);

    },

    error: err => console.error(err)

  });

}

}