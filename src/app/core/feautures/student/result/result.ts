import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../../service/quizservice';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-result',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './result.html',
  styleUrls: ['./result.css']
})
export class Result {
  quizTitle = '';
  score = 0;
  totalQuestions = 0;
  maxMarks = 0;
  correct = 0;
  wrong = 0;
answers: any[] = [];

  attemptId!: number;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private quizService: QuizService,
     private router: Router,
  ) {}

  ngOnInit(): void {

    this.attemptId = Number(this.route.snapshot.paramMap.get('attemptId'));

    console.log("Attempt Id:", this.attemptId);

    this.quizTitle = localStorage.getItem('quizTitle') || '';
    
    this.loadResult();
  }

  goToDashboard(): void {
  this.router.navigate(['/student/dashboard']);
}
  loadResult(): void {

    this.quizService.getQuizResult(this.attemptId).subscribe({
      next: (res: any) => {
        console.log("Result:", res);

        this.score = res.score;
        this.totalQuestions = res.totalQuestions;
        this.maxMarks = res.maxMarks;
        this.correct = res.correctAnswers;
        this.wrong = res.wrongAnswers;
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });

  }
viewAnswers(): void {
  this.router.navigate(['/student/answer-review', this.attemptId]);
}
}