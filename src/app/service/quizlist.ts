import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizAdmin } from '../model/quiz-admin';
@Injectable({
    providedIn:'root'
})
export class Quizlist {
    private apiUrl=`http://localhost:8080/api/quiz`;
    constructor(private http:HttpClient){}
    getQuiz():Observable<any[]>{
        return this.http.get<QuizAdmin[]>(this.apiUrl)
    }
    getquizbyid(id:number){
        return this.http.get<any>(`${this.apiUrl}/${id}`)
    }

  updateQuiz(id: number, quiz: QuizAdmin): Observable<QuizAdmin> {
    return this.http.put<QuizAdmin>(`${this.apiUrl}/${id}`, quiz);
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
