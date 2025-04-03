import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from '@app/models/identity/User';
import { AccountService } from '@app/services/account.service';
import { switchMap, take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);

  console.log('Interceptor ativado para:', req.url); // Log para depuração

  if (req.url.includes('/login')) {
    console.log('Interceptador ignorando a rota de login.');
    return next(req); // Passa a requisição adiante sem modificar
  }

  return accountService.currentUser$.pipe(
    take(1),
    switchMap(currentUser => {
      if (currentUser?.token) {
        console.log('Adicionando cabeçalho Authorization');
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
      return next(req);
    })
  );
};
