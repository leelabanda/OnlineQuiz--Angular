import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { Quizlist } from '../../../../service/quizlist';

@Component({
  selector: 'app-quizlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizlist.html',
  styleUrl: './quizlist.css'
})
export class Quizlist1 implements OnInit {

  quizlist$!: Observable<any[]>;

  constructor(
    private quizService: Quizlist,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadQuizess();
  }

  loadQuizess(): void {
    this.quizlist$ = this.quizService.getQuiz().pipe(
      map((res: any) => res.data || res)
    );
  }

  viewQuestions(quizId: number): void {
    this.router.navigate(['/admin/questions'], {
      state: { targetQuizId: quizId }
    });
  }

  edit(quiz: any): void {
    this.router.navigate(['/admin/quiz/edit', quiz.id]);
  }

  delete(id: number): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizService.deleteQuiz(id).subscribe({
        next: () => {
          alert('Quiz deleted successfully');
          console.log('Id deleted Successfully',id);
          this.loadQuizess();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          alert('Deletion failed');
        }
      });
    }
  }
  viewQuestionsList(id: number): void {
  this.router.navigate(['/admin/questions', id]);
}
}