import { Component } from '@angular/core';
import { Userservice } from '../../../../service/userservice';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
studentCount$!: Observable<number>;
totalQuizzes$!: Observable<any>;

  constructor(private userService: Userservice) {}

  ngOnInit(): void {
    // Pipe the data to map it to its length
    this.studentCount$ = this.userService.getUsers().pipe(
      map(users => users ? users.filter(u=>u.role!=='ADMIN').length : 0)
    );
    this.totalQuizzes$=this.userService.totalCount();
  }
}