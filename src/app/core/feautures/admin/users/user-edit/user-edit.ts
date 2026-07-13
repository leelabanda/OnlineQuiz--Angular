import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Userservice } from '../../../../../service/userservice';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-edit.html',
  styleUrls: ['./user-edit.css']
})
export class UserEdit implements OnInit {

  user: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: Userservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  loadUser() {
    this.userService.getUserById(this.id).subscribe({
      next: (res:any) => {
        this.user = res.data;
      this.user.password = "";
    },
      error: (err) => console.error(err)
    });
  }

  updateUser() {
    this.userService.updateUser(this.id,this.user).subscribe({
      next: (res) => {
        console.log(res);
        alert('User updated successfully');
        this.router.navigate(['/admin/users']);
      },
      error: (err) => console.error(err)
    });
  }

  cancel() {
    this.router.navigate(['/admin/users']);
  }
}