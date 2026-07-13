import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../model/register-request';
import { User } from '../model/user';
//import { User } from '../core/feautures/admin/users/users';

@Injectable({
    providedIn:'root'
})
export class Userservice {
     private api="http://localhost:8080/api/users";
  constructor(private http:HttpClient){}
  getUsers():Observable<any[]>{
    return this.http.get<any[]>(`${this.api}/users-with-attempts`);
  }
    totalCount():Observable<number>{
    return this.http.get<number>(`${this.api}/count`);
  }
  getListUser():Observable<any[]>{
    return this.http.get<any[]>(this.api);
  }
  deleteUser(id: number): Observable<any> {
  return this.http.delete(`${this.api}/${id}`);
}
updateByUser(id:number,user:any){
    return this.http.put(`${this.api}/${id}`,user);
}
getUserById(id:number){
    return this.http.get(`${this.api}/${id}`);
}
updateUser(id:number,user:any){
    return this.http.put(this.api+`/${id}`,user,{responseType:'text'});
    // return this.http.post(this.api+"/register",data,{responseType:'text'});
}
getStudentQuestions() {
  return this.http.get<any>('http://localhost:8080/api/student/questions');
}
getProfile():Observable<User>{
  return this.http.get<User>(`http://localhost:8080/api/users/profile`)
}
updateProfile(user:User):Observable<User>{
  return this.http.put<User>(`http://localhost:8080/api/users/profile`,user);
}
}
