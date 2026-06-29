import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/services/account.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  const token = accountService.getToken();

  if(token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const isAuthRoute = 
        req.url.includes('/login') ||
        req.url.includes('/refresh');

      if(err.status === 401 && !isAuthRoute){
        return accountService.refreshToken().pipe(
          switchMap((response) => {
            accountService.setToken(response.token);
            accountService.setRefreshToken(response.refreshToken);
            accountService.setCurrentUser(response);

            const retryRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.token}`
              }
            });

            return next(retryRequest);
          }),
          catchError((refreshError) => {
            accountService.logout();
            router.navigate(['/user/login']);

            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
