import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../service/admin-service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questions.html',
  styleUrls: ['./questions.css']
})
export class EditQuestions implements OnInit {
  quizTitle='';
  validateForm!: FormGroup;
  loadingquestions=false;
  quizzes: any[] = [];
  submitted = false;

  questionId!: number;

  constructor(
    private fb: FormBuilder,
    private questionService: AdminService,
    private router: Router,
    private cdf:ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {

  this.validateForm = this.fb.group({
    quiz: ['', Validators.required],
    questionType: ['single', Validators.required],
    questionText: ['', Validators.required],
    marks: [1, Validators.required],
    options: this.fb.array([])
  });

  this.validateForm.get('questionType')?.valueChanges.subscribe(type => {
    this.handleTypeChange(type);
  });

  this.questionId = Number(this.route.snapshot.paramMap.get('id'));

  this.loadQuizzes();
}

  get optionsArray(): FormArray {
    return this.validateForm.get('options') as FormArray;
  }
loadQuizzes() {
  this.questionService.getAllQuiz().subscribe({
    next: (res: any) => {
      this.quizzes = res.data;
this.cdf.detectChanges();
      if (this.questionId) {
        this.loadQuestion(this.questionId);
      }
    }
  });
}
loadQuestion(id: number) {

  this.questionService.getquizbyid(id).subscribe({
    next: (res: any) => {
console.log(JSON.stringify(res.data, null, 2));
      const question = res.data;
    this.loadingquestions=true;
      this.validateForm.patchValue({
        quiz: question.quizId || question.quiz?.id || '',
        questionType: question.questionType||'single',
        questionText: question.questionText,
        marks: question.marks
      });
      const quizId = question.quizId || question.quiz?.id;

const selectedQuiz = this.quizzes.find(q => q.id === quizId);

this.quizTitle = selectedQuiz ? selectedQuiz.title : '';
      this.optionsArray.clear();

      question.options.forEach((op: any) => {

        this.optionsArray.push(
          this.fb.group({
            optionText: [op.optionText, Validators.required],
            isCorrect: [op.isCorrect]
          })
        );

      });

    }

  });

}
handleTypeChange(type: string) {

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
          optionText: [''],
          isCorrect: [false]
        })
      );

    }

  }

}

  onRadioSelect(index: number) {

    this.optionsArray.controls.forEach((control, i) => {

      control.get('isCorrect')?.setValue(i === index);

    });

  }

  submitForm() {

    this.submitted = true;

    if (this.validateForm.invalid) {
      return;
    }

    const payload = this.validateForm.value;

    // Call Update API
    this.questionService.editQuestion(this.questionId, payload).subscribe({

      next: () => {

        alert('Question Updated Successfully');

        this.router.navigate(['/admin/question/list']);

      },

      error: err => console.log(err)

    });

  }

}