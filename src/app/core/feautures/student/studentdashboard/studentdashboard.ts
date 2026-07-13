import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentdashboard',
  standalone: true,
  imports: [],
  templateUrl: './studentdashboard.html',
  styleUrl: './studentdashboard.css',
})
export class Studentdashboard implements OnInit {
studentName: string = '';
  userId!: number;
  availableQuizzes: number = 0;
  completedQuizzes: number = 0;
  totalScore:number=0;
  averageScore: number = 0;
  
  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUser();
    
  }

  loadUser() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // Pass the headers to the request
    this.http.get<any>('http://localhost:8080/api/auth/me', { headers })
      .subscribe({
        next: res => {
          this.userId = res.id; // Assign the ID
          this.studentName = res.name;
          
          // Now call loadStats ONLY after we have the userId
          this.loadStats(headers); 
        },
        error: err => console.error('Failed to load user', err)
      });
  }


  loadStats(headers: any) {
    // 1. Attempts by user
    this.http.get<any[]>(`http://localhost:8080/api/users/attempts/user/${this.userId}`, { headers })
      .subscribe(attempts => {
        this.completedQuizzes = attempts.length;
        const totalScore = attempts.reduce((sum, a) => sum + (a.score || 0), 0);
        this.averageScore = attempts.length ? Math.round(totalScore / attempts.length) : 0;
        this.cdr.detectChanges();
      });

    // 2. Total quizzes
    // Ensure the backend returns the data in a format you can access.
    // If res is an array, use res.length. If it is an object, use res.data.length.
    this.http.get<any>(`http://localhost:8080/api/quiz`, { headers })
      .subscribe(res => {
        // Log the response to see how to access the array correctly
        console.log('Quiz API response:', res);
        
        // Use either 'res.length' or 'res.data.length' based on your console output
        this.availableQuizzes = Array.isArray(res) ? res.length : res.data.length;
        this.cdr.detectChanges();
      });
this.http.get<number>(
  `http://localhost:8080/api/attempt/${this.userId}/completed-count`,
  { headers }
).subscribe(count => {
  this.completedQuizzes = count;
  this.cdr.detectChanges();
});
this.http.get<number>(
  `http://localhost:8080/api/users/${this.userId}/total-score`,{headers}
).subscribe(score=>{
  this.totalScore=score;
});
this.http.get<number>(
  `http://localhost:8080/api/users/${this.userId}/average-score`,{headers}
).subscribe(score=>{
  this.averageScore=score;
});
}
  
}