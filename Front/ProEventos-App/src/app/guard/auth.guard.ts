import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const user = localStorage.getItem('user');

  if (!user) {
    toastr.info('Usuário não autenticado!');
    router.navigate(['/user/login']);
    return false;
  }

  const token = JSON.parse(user).token;

  if (!token) {
    localStorage.removeItem('user');
    toastr.warning('Sessão inválida!');
    router.navigate(['/user/login']);
    return false;
  }

  const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  const expirationDate = tokenPayload.exp * 1000;
  const isExpired = Date.now() > expirationDate;

  if (isExpired) {
    localStorage.removeItem('user');
    toastr.warning('Sessão expirada. Faça login novamente.');
    router.navigate(['/user/login']);
    return false;
  }

  return true;
};