import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../../service/admin-service';
import { Router } from 'express';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  inProgess: number = 0;   // Add this
  completed: number = 0;    // Add this
  averageScore:number=0;
  constructor(private cdr:ChangeDetectorRef,private http: HttpClient,private adminservice:AdminService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
  this.http.get<any>('http://localhost:8080/api/attempt/admin/stats')
    .subscribe({
      next: (stats) => {
        console.log("STATS RESPONSE 👉", stats); // 👈 ADD THIS
        this.totalAttempts = stats.totalAttempts;
        this.totalUsers = stats.totalUsers;
        this.inProgess = stats.inProgess; // Bind new data
          this.completed = stats.completed;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading admin stats:', err);
      }
    });
}
}