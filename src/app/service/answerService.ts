import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../model/register-request';
import { QuestionAdmin } from '../model/question-admin';

@Injectable({
    providedIn:'root'
})
export class AnswerService {
     private apiUrl=`http://localhost:8080/api/answer`;
    constructor(private http:HttpClient){}
    getAnswerReview(AttemptId:number){
        return this.http.get(`${this.apiUrl}/${AttemptId}/answers`);
    }
    getPreviousAnswers(attemptId:number){

 return this.http.get<any>(
   `${this.apiUrl}/attempt/${attemptId}/answers`
 );
 
}  saveAnswer(answer:any){

    return this.http.post(
      this.apiUrl,
      answer
    );
}
}
