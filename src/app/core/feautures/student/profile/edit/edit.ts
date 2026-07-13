import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Userservice } from '../../../../../service/userservice';
import { User } from '../../../../../model/user';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.html',
  styleUrls: ['./edit.css']
})
export class EditProfile {
  user: User = {
    id: 0,
    name: '',
    email: '',
    //password: '',
    role: ''
  };

  constructor(
    private userService: Userservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateProfile(): void {
    this.userService.updateProfile(this.user).subscribe({
      next: () => {
        alert('Profile Updated Successfully');
        this.router.navigate(['/admin/profile']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
