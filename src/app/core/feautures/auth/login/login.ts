import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../service/auth';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  error='';
  loginForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private auth:Auth,
    private router:Router
  ){this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  });
}
  login(){
    if(this.loginForm.invalid){
      return;
    }
    this.auth.login(this.loginForm.value as any).subscribe({
      next:(res)=>{
        console.log(res);
        
        localStorage.setItem("token",res.token);
  //      localStorage.setItem('userId',res.userId.toString());
        localStorage.setItem("role",res.role);
        const expiry=Date.now()+(24*60*60*1000);
        localStorage.setItem("name",res.name);
        localStorage.setItem("tokenExpiry",expiry.toString());
        localStorage.setItem("userId",res.userId.toString());
        console.log(localStorage.getItem("userId"));
        // localStorage.clear();
        // console.log(localStorage);
        console.log(localStorage.getItem("name"));
console.log(localStorage.getItem("token"));
console.log(localStorage.getItem("role"));
console.log(localStorage.getItem("tokenExpiry"))

        if(res.role==="ADMIN"){
          // this.router.navigate(['/admin']);
          this.router.navigate(['/admin']).then(result => {
  console.log('Navigation successful:', result);
});
        }
        else{
          this.router.navigate(['/student'])
        }
      },
      error:()=>{
        this.error="Invalid Email or password";
      }
    });
  }
}
