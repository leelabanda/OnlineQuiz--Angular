import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Questionservice } from '../../../../service/questionservice';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-viewquestions',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './viewquestions.html',
  styleUrl: './viewquestions.css',
})
export class Viewquestions {
  questions: any[] = [];

constructor(
  private route: ActivatedRoute,
  private router:Router,
  private cdf:ChangeDetectorRef,
  private questionService: Questionservice
) {}

ngOnInit(): void {
  const quizId = Number(this.route.snapshot.paramMap.get('id'));
  this.loadQuizess();
}
  loadQuizess(): void {
      this.questionService.getquizall().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.questions=res.data||res;
          console.log("Full Response:", res);
      console.log("Data:", res.data);
      console.log("First Question:", res.data[0]);
       this.cdf.detectChanges();
        },
        error:(err)=>{
          console.error("Error loading the Question");
        }
      });
  }
  editQuestion(question:any){
    console.log('Edit Question',question);
    this.router.navigate(['/admin/question/edit',question.id]);
     this.cdf.detectChanges();
  }
  
  delete(id: number): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this quiz?')) {
      this.questionService.delete(id).subscribe({
        next: () => {
          alert('Quiz deleted successfully');
          console.log('Id deleted Successfully',id);
          this.loadQuizess();
        this.cdf.detectChanges();
        },
        error: (err) => {
          console.error(err);
          alert('Deletion failed');
        }
      });
    }
  }
  addQuestion(){
    this.router.navigate([`/admin/questions`])
  }

}
