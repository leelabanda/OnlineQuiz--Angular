import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionAdmin } from '../model/question-admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAdminStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/stats`);
  }
  private quizUrl = 'http://localhost:8080/api/quiz';
  private attemptUrl='http://localhost:8080/api/attempt';
private baseUrl1='http://localhost:8080/api/question';
  addQuestionToQuiz(quizId: number, questionPayload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl1}?quiz=${quizId}`, questionPayload);
  }
  getAllQuiz():Observable<any>{
    return this.http.get(`${this.quizUrl}`)
  }
  getStudentReport(quizId:number){
  return this.http.get<any>(
      `${this.attemptUrl}/report/${quizId}`
  );
}
  getQuizAttemptbyId(id:number){
    return this.http.get<any>(`$quizUrl/${id}`)
  }
  getquizbyid(id:number){
        return this.http.get<any>(`${this.baseUrl1}/${id}`)
    }
    editQuestion(id:number,question:QuestionAdmin){
            return this.http.put(`${this.baseUrl1}/${id}`,question)
        }


}
