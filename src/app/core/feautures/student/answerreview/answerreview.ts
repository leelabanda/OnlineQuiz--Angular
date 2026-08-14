import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from '../../../../service/answerService';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-answerreview',
  imports: [CommonModule],
  templateUrl: './answerreview.html',
  styleUrl: './answerreview.css',
})
export class Answerreview {
  answers:any[]=[];
  attemptId!:number;
  constructor(private route: ActivatedRoute,private router:Router,
    private answerService:AnswerService,
  private cdf:ChangeDetectorRef){}
  ngOnInit(){
    this.attemptId=Number(this.route.snapshot.paramMap.get('attemptId'));
    this.answerService.getAnswerReview(this.attemptId).subscribe({
      next:(res:any)=>{
        this.answers=res.data;
        this.cdf.detectChanges();
        console.log(this.answers);
      },error:(err)=>console.log(err)
    });
  }
}
