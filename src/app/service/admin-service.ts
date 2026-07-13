import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAdminStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/stats`);
  }
private baseUrl1='http://localhost:8080/api/question';
  addQuestionToQuiz(quizId: number, questionPayload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl1}?quiz=${quizId}`, questionPayload);
  }

}
