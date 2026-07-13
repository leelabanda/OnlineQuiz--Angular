import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {
  username: String='';

  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}

 ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      const savedName=localStorage.getItem('name');
      if(savedName){
        this.username=savedName;
      }
    }

  }

  logout() {
    if(typeof window!=='undefined'){
      localStorage.clear();
    }
    this.router.navigate(['/login']);
  }
}
