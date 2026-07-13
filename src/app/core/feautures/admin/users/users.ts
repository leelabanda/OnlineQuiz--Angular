import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Userservice } from '../../../../service/userservice';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class User implements OnInit {
  users$!: Observable<any[]>;
  selectedUser: any = null;

  constructor(
    private userService: Userservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.userService.getUsers().pipe(
      map(users => users.filter(user => user.role !== 'ADMIN'))
    );
  }

  getLatestAttempt(user: any) {
    if (!user.quizAttempts || user.quizAttempts.length === 0) {
      return null;
    }

    return user.quizAttempts[user.quizAttempts.length - 1];
  }

  editUser(id: number): void {
    this.router.navigate(['/admin/users/edit', id]);
  }

  saveUser(): void {
    this.userService.updateUser(this.selectedUser.id, this.selectedUser)
      .subscribe({
        next: () => {
          alert('User updated successfully');
          this.selectedUser = null;
          this.loadUsers();
        },
        error: err => console.error(err)
      });
  }

  deleteUser(id: number): void {

    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.userService.deleteUser(id).subscribe({
      next: () => {
        alert('User deleted successfully');
        this.loadUsers();
      },
      error: err => console.error(err)
    });
  }

}