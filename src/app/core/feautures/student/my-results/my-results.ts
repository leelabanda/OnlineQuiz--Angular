import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../../../../service/quizservice';
import { QuizResult } from '../../../../model/quizresult';

@Component({
  selector: 'app-my-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-results.html'
})
export class MyResults implements OnInit {

  attempts: QuizResult[] = [];

  constructor(
    private quizService: QuizService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const userId = Number(localStorage.getItem("userId"));

    this.quizService.getStudentResults(userId).subscribe({

      next: (res: any) => {
        this.attempts = res.data;

        // Trigger change detection manually
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
      }

    });
  }

  openResult(id: number): void {
    this.router.navigate(['/student/results', id]);
  }
}