import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Auth } from '../../../../service/auth';
@Component({
  selector: 'app-forgot',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.html',
  styleUrl: './forgot.css',
})
export class Forgot { 
  forgotForm!:FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: Auth
  ){
    this.forgotForm = this.fb.group({
    email:['',[Validators.required,Validators.email]]
  });
  }


  sendOtp(){

    this.auth.sendOtp(this.forgotForm.value.email!)
      .subscribe(res=>{

        alert("OTP Sent");

      });

  }

}