import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../../../model/user';
import { Userservice } from '../../../../service/userservice';
import { CommonModule } from '@angular/common';
import{Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  standalone:true,
  styleUrl: './profile.css',
})
export class Profile {
  user?:User;
  constructor(private userservice:Userservice,
    private cdr:ChangeDetectorRef,private router:Router){}
  ngOnInit():void{
    this.loadProfile();
  }
  loadProfile(){
    this.userservice.getProfile().subscribe({
      next:(response)=>{
        console.log("Profile",response);
        this.user=response;
        this.cdr.detectChanges();
      },error:(error)=>{
        console.error(error);
      }
    })
  }
  editProfile(){
    console.log("Edit button clicked");
    this.router.navigate(['/student/edit-profile']);
  }
}
