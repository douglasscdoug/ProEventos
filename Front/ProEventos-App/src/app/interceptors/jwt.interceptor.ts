import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '@app/services/account.service';
import { catchError, switchMap, take, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);

  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  return accountService.currentUser$.pipe(
    take(1),
    switchMap(currentUser => {
      if (currentUser?.token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
      return next(req).pipe(
        catchError(error => {
          if(error) {
            localStorage.removeItem('user')
          }

          return throwError(() => error);
        })
      );
    })
  );
};
