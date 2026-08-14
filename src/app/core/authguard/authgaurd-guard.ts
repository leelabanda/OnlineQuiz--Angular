import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authgaurdGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

  console.log("Guard Token :", token);
  console.log("Guard Expiry :", expiry);

  if (token && expiry && Date.now() < Number(expiry)) {
    return true;
  }

  localStorage.clear();

  router.navigate(['/login']);

  return false;

};