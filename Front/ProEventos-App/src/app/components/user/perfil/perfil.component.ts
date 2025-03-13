import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '../../../shared/titulo/titulo.component';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [TituloComponent, ReactiveFormsModule, CommonModule]
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;

  constructor(private fb: FormBuilder) {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmaSenha')
    }

    this.perfilForm = fb.group({
      titulo: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      funcao: ['', Validators.required],
      descricao: [''],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmaSenha: ['', Validators.required]
    }, formOptions);
   }

  ngOnInit() {
  }

  get f(): any {
    return this.perfilForm.controls;
  }

  onSubmit() {
    if (this.perfilForm.valid) {
      console.log(this.perfilForm.value);
    }
  }

  public resetForm(): void {
    this.perfilForm.reset();
  }
}
