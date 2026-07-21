import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { phoneValidator } from '@app/helpers/Phone.Validator';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserDetails } from '@app/models/identity/user-details';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { PalestranteService } from '@app/services/palestrante.service';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-perfil-detalhe',
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './perfil-detalhe.component.html',
  styleUrl: './perfil-detalhe.component.scss'
})
export class PerfilDetalheComponent implements OnInit {
  userUpdate = {} as UserDetails;
  perfilForm: FormGroup;

  @Output() changeFormValue = new EventEmitter<UserDetails>();
  @Output() perfilAtualizado = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private palestranteService: PalestranteService
  ) {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmaPassword')
    }

    this.perfilForm = fb.group({
      userName: [''],
      imagemUrl: [''],
      titulo: ['NaoInformado', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, phoneValidator]],
      funcao: ['NaoInformado', Validators.required],
      descricao: ['', Validators.required],
      password: ['', Validators.minLength(6)],
      confirmaPassword: ['']
    }, formOptions);
  }

  ngOnInit() {
    this.carregarUsuario();
  }

  private verificaForm(): void {
    this.perfilForm.valueChanges.subscribe(() =>
      this.changeFormValue.emit({ ...this.perfilForm.value })
    );
  }

  private carregarUsuario(): void {
    this.spinner.show();
    this.accountService.getUser().subscribe({
      next: (userRetorno) => {
        this.userUpdate = userRetorno;
        this.perfilForm.patchValue(this.userUpdate);
        this.changeFormValue.emit(this.userUpdate);
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
    const {
      userName,
      nome,
      sobrenome,
      email,
      titulo,
      phoneNumber,
      funcao,
      descricao,
      imagemUrl,
      password
    } = this.perfilForm.value;

    const userUpdate: UserUpdate = {
      userName,
      nome,
      sobrenome,
      email,
      titulo,
      phoneNumber,
      funcao,
      descricao,
      imagemUrl,
      password
    };

    this.spinner.show();

    this.accountService.updateUser(userUpdate).subscribe({
      next: () => {
        this.toaster.success('Usuário atualizado', 'Sucesso');
        this.perfilAtualizado.emit();
        this.carregarUsuario();
      },
      error: (error: any) => {
        this.toaster.error(error.error);
        console.error(error);
      }
    }).add(() => this.spinner.hide());
  }
}
