import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../../service/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth
  ) {

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['STUDENT']
    });

  }

  register() {

    if (this.registerForm.invalid) {
      return;
    }

    this.auth.register(this.registerForm.value).subscribe({
next: (res: any) => {

  console.log("Register Response:", res);

  // Store Token
  localStorage.setItem("token", res.token);

  // Store Expiry
  const expiry = Date.now() + (24 * 60 * 60 * 1000);
  localStorage.setItem("tokenExpiry", expiry.toString());

  localStorage.setItem("role", res.role);

  if (res.userId != null) {
    localStorage.setItem("userId", String(res.userId));
  }

  localStorage.setItem("name", res.name);

  // 👇 ADD THESE LINES HERE
  console.log("Response Token:", res.token);
  console.log("Stored Token:", localStorage.getItem("token"));
  console.log("Stored Expiry:", localStorage.getItem("tokenExpiry"));
  console.log("Stored Role:", localStorage.getItem("role"));
  console.log("Stored UserId:", localStorage.getItem("userId"));

  if (res.role === "ADMIN") {
    this.router.navigate(['/admin']);
  } else {
    this.router.navigate(['/student']);
  }
},
      error: (err) => {
        console.log(err);
        alert("Registration Failed");
      }

    });

  }

}