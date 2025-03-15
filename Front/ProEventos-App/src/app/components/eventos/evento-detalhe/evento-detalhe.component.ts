import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';

import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  imports: [ReactiveFormsModule, CommonModule, BsDatepickerModule],
  styleUrls: ['./evento-detalhe.component.css']
})
export class EventoDetalheComponent implements OnInit {
  eventoForm: FormGroup;
  evento = {} as Evento;
  estadoSalvar = 'post';

  get f(): any {
    return this.eventoForm.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:mm',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.eventoForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemUrl: ['', Validators.required],
    });

    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam != null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe({
        next: (evento: Evento) => {
          this.evento = { ...evento };
          this.eventoForm.patchValue(this.evento);
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar evento.', 'Erro!');
          console.error(error);
        },
        complete: () => { this.spinner.hide() }
      })
    }
  }

  ngOnInit() {
    this.carregarEvento();
  }

  public resetForm(): void {
    this.eventoForm.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarAlteracoes(): void {
    this.spinner.show();
    if (this.eventoForm.valid) {
      this.evento = (this.estadoSalvar == 'post')
        ? { ... this.eventoForm.value }
        : { id: this.evento.id, ... this.eventoForm.value };
      
      if(this.estadoSalvar == 'post' || this.estadoSalvar == 'put'){
        this.eventoService[this.estadoSalvar](this.evento).subscribe({
          next: () => {
            this.toastr.success('Evento salvo com sucesso!', 'Sucesso')
          },
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar evento', 'Erro');
          },
          complete: () => { this.spinner.hide(); }
        });
      }
    }
  }
}
