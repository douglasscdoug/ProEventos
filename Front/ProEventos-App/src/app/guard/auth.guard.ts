import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const taoster = inject(ToastrService)

  if(localStorage.getItem('user') !== null)
    return true;

  taoster.info('Usuário não autenticado!');
  router.navigate(['/user/login']);
  return false;
};
