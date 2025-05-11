import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { PalestranteService } from '@app/services/palestrante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-detalhe',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './perfil-detalhe.component.html',
  styleUrl: './perfil-detalhe.component.scss'
})
export class PerfilDetalheComponent implements OnInit {
  userUpdate = {} as UserUpdate;
  perfilForm: FormGroup;

  @Output() changeFormValue = new EventEmitter();

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
      phoneNumber: ['', Validators.required],
      funcao: ['NaoInformado', Validators.required],
      descricao: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmaPassword: ['', Validators.required]
    }, formOptions);
  }

  ngOnInit() {
    this.carregarUsuario();
    this.verificaForm();
  }

  private verificaForm(): void {
    this.perfilForm.valueChanges.subscribe(() => this.changeFormValue.emit({...this.perfilForm.value}));
  }

  private carregarUsuario(): void {
    this.spinner.show();
    this.accountService.getUser().subscribe({
      next: (userRetorno: UserUpdate) => {
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

    if(this.f.funcao.value == 'Palestrante') {
      this.palestranteService.post().subscribe(
        () => this.toaster.success('Função palestrante ativada!', 'Sucesso!'),
        (error: any) => {
          this.toaster.error('A função palestrante não pode ser ativada, tente novamente mais tarde.', 'Erro!');
          console.error(error);
        }
      )
    }

    this.accountService.updateUser(userUpdate).subscribe({
      next: () => { this.toaster.success('Usuário atualizado', 'Sucesso')},
      error: (error: any) => {
        this.toaster.error(error.error);
        console.error(error);
      }
    }).add(() => this.spinner.hide());
  }
}
