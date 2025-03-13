import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  imports:[ReactiveFormsModule, CommonModule],
  styleUrls: ['./evento-detalhe.component.css']
})
export class EventoDetalheComponent implements OnInit {
  eventoForm: FormGroup;

  get f(): any {
    return this.eventoForm.controls;
  }

  constructor(private fb: FormBuilder) {
    this.eventoForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemUrl: ['', Validators.required],
    });
   }

  ngOnInit() {}

  public resetForm(): void{
    this.eventoForm.reset();
  }
}
