import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserLogin } from '@app/models/identity/UserLogin';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  model = {} as UserLogin;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {

  }

  public login(): void {
    this.accountService.login(this.model).subscribe({
      next: () => { this.router.navigateByUrl('/dashboard'); },
      error: (error: any) => {
        if (error.status == 401)
          this.toaster.error('Usuário ou senha inválido');

        else
          console.error(error);
      }
    })
  }
}
