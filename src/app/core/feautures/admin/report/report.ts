import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../../service/admin-service';

@Component({
  selector: 'app-report',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './report.html',
  styleUrl: './report.css',
})
export class Report {
  quizzes: any[] = [];
  validateForm!: FormGroup;
  students:any[]=[];
constructor(private fb: FormBuilder, private service: AdminService,private cdf:ChangeDetectorRef) {}

ngOnInit() {
  this.validateForm = this.fb.group({
    quiz: ['', Validators.required]
  });
  this.loadQuizzes();
//  this.getAllQuizzes();
}
  loadQuizzes(): void {
  this.service.getAllQuiz().subscribe({
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
viewReport(): void {

  const quizId = this.validateForm.get('quiz')?.value;

  if (!quizId) {
    this.students = [];
    return;
  }

  this.service.getStudentReport(quizId).subscribe({
    next: (res: any) => {
      console.log(res);
      this.students = res.data;
      this.cdf.detectChanges();
    },
    error: (err) => {
      console.error(err);
      this.students = [];
    }
  });
}
}
