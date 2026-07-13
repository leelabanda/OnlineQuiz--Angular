import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../../../service/quizservice';
import { Router } from '@angular/router';
@Component({
  selector: 'app-startquiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './startquiz.html',
  styleUrl: './startquiz.css'
})
export class Startquiz implements OnInit {

  questions: any[] = [];
  selectedAnswers: number[] = [];

  currentQuestion = 0;
  isLoading = true;

  attemptId!: number;
  quizId!: number;
  
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.quizId = Number(localStorage.getItem('quizId'));

    const userId = Number(localStorage.getItem('userId'));

    // Create attempt only once
    const savedAttemptId = localStorage.getItem(`attemptId_${this.quizId}`);

    if (savedAttemptId) {

      this.attemptId = Number(savedAttemptId);

    } else {

      const attempt = {
        userId: userId,
        quizId: this.quizId,
        score: 0,
        status: 'IN_PROGRESS'
      };

      this.quizService.createAttempt(attempt).subscribe({
        next: (res: any) => {

          this.attemptId = res.data.id;

          localStorage.setItem(
            `attemptId_${this.quizId}`,
            this.attemptId.toString()
          );

        },
        error: err => console.error(err)
      });

    }

    // Load Questions
    this.route.paramMap.subscribe(params => {

      const title = decodeURIComponent(params.get('title') || '');

      console.log("Quiz Title :", title);

      if (title) {
        this.loadQuestions(title);
      }

    });

  }

  loadQuestions(title: string): void {

    this.isLoading = true;

    this.quizService.getQuestionsByStudent(title).subscribe({

      next: (res: any) => {

        console.log("Response :", res);

        this.questions = res.data ? [...res.data] : [];

        console.log("Questions :", this.questions);

        this.isLoading = false;

        this.cdr.detectChanges();

      },

      error: err => {

        console.error(err);

        this.questions = [];

        this.isLoading = false;

      }

    });

  }

  nextQuestion(): void {

    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
    }

  }

  previousQuestion(): void {

    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }

  }

  calculateScore(): number {

    let score = 0;

    this.questions.forEach((question, index) => {

      if (this.selectedAnswers[index] === question.correctAnswer) {
        score++;
      }

    });

    return score;

  }

 submitQuiz(): void {

  const formattedAnswers = this.questions.map((question,index)=>({

      questionId: question.id,
      selectedOptionId: this.selectedAnswers[index]

  }));

  const request = {
      answers: formattedAnswers
  };

  this.quizService.submitQuiz(this.attemptId, request).subscribe({

      next:(res:any)=>{

          localStorage.removeItem(`attemptId_${this.quizId}`);

          this.router.navigate(
            ['/student/results', this.attemptId]
          );

      },

      error:err=>console.log(err)

  });

}
}