import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { switchMap, throwError, catchError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  const http = inject(HttpClient);
  const authService = inject(AuthService);

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error?.code === 'token_not_valid') {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          return http.post<any>('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken
          }).pipe(
            switchMap((res) => {
              localStorage.setItem('authToken', res.access);
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${res.access}` }
              });
              return next(newReq);
            }),
            catchError(() => {
              authService.logout();
              return throwError(() => new Error('Session expired'));
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};