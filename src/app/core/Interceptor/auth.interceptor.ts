import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('tokenExpiry');

  console.log("Request URL :", req.url);
  console.log("Stored Token :", token);
  console.log("Stored Expiry :", expiry);

  if (
    req.url.includes('/api/auth/login') ||
    req.url.includes('/api/auth/register')
  ) {
    return next(req);
  }

  if (token && expiry && Date.now() < Number(expiry)) {

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Authorization Header :", authReq.headers.get("Authorization"));

    return next(authReq);
  }

  return next(req);
};