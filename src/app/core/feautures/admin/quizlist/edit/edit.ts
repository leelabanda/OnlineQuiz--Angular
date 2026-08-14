import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { Quizlist } from '../../../../../service/quizlist';
import { title } from 'process';
@Component({
  selector: 'app-edit',
  imports: [FormsModule,CommonModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  quiz={
    id:0,
    title:'',
    description:'',
    questions:[],
    duration:0
  };
  constructor(private router:Router,private quizService:Quizlist,private route:ActivatedRoute){}
   ngOnInit(): void {
      this.loadProfile();
      const id=Number(this.route.snapshot.paramMap.get('id'));
    }
  
    loadProfile(): void {
      this.quizService.getquizbyid(this.quiz.id).subscribe({
        next: (data: any) => {
          this.quiz = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  
    updateQuiz(): void {
      this.quizService.updateQuiz(this.quiz.id,this.quiz).subscribe({
        next: () => {
          alert('Profile Updated Successfully');
          this.router.navigate(['/admin/profile']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
}
