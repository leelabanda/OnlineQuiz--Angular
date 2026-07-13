import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../model/register-request';

@Injectable({
    providedIn:'root'
})
export class Auth {
    private api="http://localhost:8080/api/auth";
  constructor(private http:HttpClient){}
  login(data:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.api+"/login",data);
  }
  register(data:RegisterRequest){
        return this.http.post(this.api+"/register",data,{responseType:'text'});
  }
  sendOtp(email:string){return this.http.post(this.api+"/forgot-password",{email},{responseType:'text'});
}
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
}
