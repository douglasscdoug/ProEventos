import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '../../../shared/titulo/titulo.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [TituloComponent, ReactiveFormsModule]
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;

  constructor() {
    this.perfilForm = new FormGroup({
      titulo: new FormControl(''),
      primeiroNome: new FormControl(''),
      ultimoNome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      funcao: new FormControl(''),
      descricao: new FormControl(''),
      senha: new FormControl(''),
      confirmarSenha: new FormControl('')
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    if (this.perfilForm.valid) {
      console.log(this.perfilForm.value);
    }
  }
}
