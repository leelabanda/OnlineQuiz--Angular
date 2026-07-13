import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { platformBrowser } from '@angular/platform-browser';

export const authgaurdGuard: CanActivateFn = () => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  
  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const token = window.localStorage.getItem('token');
  const expiry = window.localStorage.getItem('tokenExpiry');
  console.log('Guard token =', token);
console.log('Guard expiry =', expiry);

  if (token && expiry && Date.now() < +expiry) {
    return true;
  }

  window.localStorage.clear();
  router.navigateByUrl('/login');

  return false;
};