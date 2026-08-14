import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class QuizService{
    private apiUrl='http://localhost:8080/';
    constructor(private http:HttpClient){}
        register(quizData:any):Observable<any>{
        return this.http.post(this.apiUrl+'api/quiz/add',quizData);
    }
    getQuestions():Observable<any[]>{
        return this.http.get<any[]>(this.apiUrl+'api/quiz');
    }
getQuestionsByStudent(title: string): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}api/question/student/title?title=${encodeURIComponent(title)}`
  );
}
createAttempt(attempt: any): Observable<any> {
  return this.http.post<any>(this.apiUrl + 'api/attempt', attempt);
}
updateAttempt(id: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl + 'api/attempt/' + id, data);
  }
  submitQuiz(attemptId: number, payload: any) {
  return this.http.post<number>(
    `http://localhost:8080/api/attempt/${attemptId}/submit`,
    payload
  );
}
getQuizResult(attemptId: number) {
  return this.http.get<any>(
    `http://localhost:8080/api/attempt/result/${attemptId}`
  );
}
getStudentResults(userId: number) {
  return this.http.get(
    `http://localhost:8080/api/attempt/student/${userId}`
  );
}
  getResult(attemptId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/attempt/result/${attemptId}`);
  }
  deletequiz(id: number){
    return this.http.delete(`https://localhost:8080/api/quiz/${id}`);
    }
}
