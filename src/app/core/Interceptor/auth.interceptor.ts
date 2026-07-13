import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // 1. If not in the browser, just pass the request through immediately
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('tokenExpiry');

    if (
    req.url.includes('/api/auth/login') ||
    req.url.includes('/api/auth/register')
  ) {
    return next(req);
  }
  // localStorage.clear();
  // 2. Only clone and add headers if token exists and is valid
  if (token && expiry) {
    if (Date.now() > Number(expiry)) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      // Token expired, proceed without token (let the backend handle 401)
      return next(req);
    } else {
      // Token is valid, add it
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    }
  }

  // 3. Fallback: proceed without token
  return next(req);
};