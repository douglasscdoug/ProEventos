import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { User } from '@app/models/identity/User';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  user = {} as User;
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toaster: ToastrService
  ) {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmaPassword')
    };

    this.registrationForm = fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmaPassword: ['', Validators.required]
    }, formOptions);
  }

  ngOnInit(): void {

  }

  public get f(): any {
    return this.registrationForm.controls;
  }

  public register(): void {
    console.log('Tentando registrar...');
    const { confirmaPassword, ...user } = this.registrationForm.value;
    this.accountService.register(user).subscribe({
      next: () => {this.router.navigateByUrl('/dashboard')},
      error: (error: any) => {this.toaster.error(error.error)}
    })
  }
}
