import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
        return throwError(() => error);
      }

      let mensagem = 'Erro inesperado. Tente novamente.';

      if (error.error) {
        if (typeof error.error === 'string') {
          mensagem = error.error;
        } else if (error.error.message) {
          mensagem = error.error.message;
        } else if (error.error?.errors) {
          const erros = Object.values(error.error.errors);

          mensagem = erros
            .flat()
            .join(' | ');
        } else if (error.error.title) {
          mensagem = error.error.title;
        }
      }

      if (error.status >= 400 && error.status !== 401 && error.status !== 403){
        toaster.error(mensagem, 'Erro', {timeOut: 5000, progressBar: true});
      }

      return throwError(() => error);
    })
  );
};