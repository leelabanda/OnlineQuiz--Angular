import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { QuizService } from '../../../../service/quizservice';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizlist',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './quizlist.html',
  styleUrl: './quizlist.css',
})
export class Quizlist {
   quizlist$!: Observable<any[]>; 
  selectedQuizQuestions: any[] = []; 

  constructor(private quizess: QuizService, private router: Router) {}

  ngOnInit(): void {
    console.log("QuizList component loaded");
    this.quizlist$ = this.quizess.getQuestions().pipe(
      map((res: any) => {
        console.log("Raw API Response in QuizList:", res);
        return res.data || res; // Safe fallback if data is flat
      })
    );
  }

  viewQuestions(quizId: number): void {
    console.log('Filtering views for Quiz ID:', quizId);
    this.router.navigate(['/questions'], { state: { targetQuizId: quizId } });
  }

  startQuiz(quiz: any): void {
    localStorage.setItem('quizId',quiz.id);
  const quizId = quiz.id || quiz.quizId;
  const title=quiz.title||quiz.quizTitle;

  this.router.navigate(
    ['/student/startquiz', title]
  );
  }
}
