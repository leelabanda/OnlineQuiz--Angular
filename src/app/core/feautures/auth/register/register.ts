import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../../service/auth';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  messgae='';
  registerForm!:FormGroup
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private auth:Auth
  ){
    this.registerForm=this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    role:['STUDENT']
  });
}
  register(){

    this.auth.register(this.registerForm.value).subscribe({
      next:(res:any)=>{
        localStorage.setItem("role",res.role);
        if(res.role=='ADMIN'){
          this.router.navigate(['/admin']);
        }
        else{
       // alert("Registeration Successful");
      this.router.navigate(['/student']);
        }
      },
      error:(err)=>{
        console.error("Registration Error:",err);
        alert("Registration Failed");
      }
    })
  }
}
