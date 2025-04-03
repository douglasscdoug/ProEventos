import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '../../../shared/titulo/titulo.component';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { CommonModule } from '@angular/common';
import { AccountService } from '@app/services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserUpdate } from '@app/models/identity/UserUpdate';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [TituloComponent, ReactiveFormsModule, CommonModule]
})
export class PerfilComponent implements OnInit {
  userUpdate = {} as UserUpdate;
  perfilForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmaPassword')
    }

    this.perfilForm = fb.group({
      userName: [''],
      titulo: ['NaoInformado', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      funcao: ['NaoInformado', Validators.required],
      descricao: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmaPassword: ['', Validators.required]
    }, formOptions);
   }

  ngOnInit() {
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    this.spinner.show();
    this.accountService.getUser().subscribe({
      next: (userRetorno: UserUpdate) => {
        console.log(userRetorno);
        this.userUpdate = userRetorno;
        this.perfilForm.patchValue(this.userUpdate);
        this.toaster.success('Usuario carregado', 'Sucesso');
      },
      error: (error: any) => {
        console.error(error);
        this.toaster.error('Usuário não carregado', 'Erro');
        this.router.navigate(['/dashboard']);
      }
    }).add(() => this.spinner.hide());
  }

  get f(): any {
    return this.perfilForm.controls;
  }

  onSubmit() {
    this.atualizarUsuario();
  }

  public resetForm(): void {
    this.perfilForm.reset();
  }

  public atualizarUsuario() {
    const { confirmaPassword, ...userUpdate } = this.perfilForm.value;
    this.spinner.show();

    this.accountService.updateUser(userUpdate).subscribe({
      next: () => { this.toaster.success('Usuário atualizado', 'Sucesso')},
      error: (error: any) => {
        this.toaster.error(error.error);
        console.error(error);
      }
    }).add(() => this.spinner.hide());
  }
}
