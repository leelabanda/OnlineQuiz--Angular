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
export class Questionservice {
     private apiUrl=`http://localhost:8080/api/question`;
    constructor(private http:HttpClient){}
    getquizall():Observable<any>{
        return this.http.get(`${this.apiUrl}`)
    }
    getquizbyid(id:number){
        return this.http.get<any>(`${this.apiUrl}/${id}`)
    }
    editQuestion(id:number,question:QuestionAdmin){
        return this.http.put(`${this.apiUrl}/${id}`,question)
    }
    delete(id:number){
        return this.http.delete(`${this.apiUrl}/${id}`)
    }
}
