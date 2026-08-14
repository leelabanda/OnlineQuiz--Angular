import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../../service/admin-service';
import { Router } from 'express';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Userservice } from '../../../../service/userservice';
import { map } from 'rxjs';

@Component({
  selector: 'app-results',
  imports:[CommonModule],
  standalone:true,
  templateUrl: './results.html',
  styleUrls: ['./results.css']
})
export class Results implements OnInit {

  totalAttempts:number=0;
  totalUsers:number=0;
  inProgress:number = 0;   // Add this
  completed:number = 0;    // Add this
  averageScore:number=0;
  constructor(private cdr:ChangeDetectorRef,private http: HttpClient,
    private adminservice:AdminService,
    private userService: Userservice) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadTotalUsers();
  }
//   loadTotalUsers(): void {
//   this.userService.getUsers().pipe(
//     map(users => users.filter(user => user.role !== 'ADMIN'))
//   ).subscribe({
//     next: (users) => {
//       this.totalUsers = users.length;
//     },
//     error: (err) => {
//       console.error('Error loading users:', err);
//     }
//   });
// }
loadTotalUsers(): void {
  this.userService.getUsers().subscribe({
    next: (users:any[]) => {
      console.log("USERS RESPONSE", users);
      users.forEach((user:any)=>{
        console.log(user);
        console.log("Role:",user.role);
      });

      const filtered = users.filter((user: any) => user.role !== 'ADMIN');

      console.log("FILTERED USERS", filtered);

      this.totalUsers = filtered.length;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
    }
  });
}
  loadStats() {
  this.http.get<any>('http://localhost:8080/api/attempt/admin/stats')
    .subscribe({
      next: (stats) => {
        console.log("STATS RESPONSE 👉", stats); // 👈 ADD THIS
        this.totalAttempts = stats.totalAttempts;
   //     this.totalUsers = stats.totalUsers;
        this.inProgress = stats.inProgess; // Bind new data
          this.completed = stats.completed;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading admin stats:', err);
      }
    });
}
}