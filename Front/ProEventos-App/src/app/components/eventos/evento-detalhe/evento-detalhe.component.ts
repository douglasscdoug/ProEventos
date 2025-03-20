import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';

import { NgxCurrencyDirective } from "ngx-currency";

import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lote } from '@app/models/Lote';
import { LoteService } from '@app/services/lote.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  imports: [ReactiveFormsModule, CommonModule, BsDatepickerModule, NgxCurrencyDirective],
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  modalRef?: BsModalRef;
  eventoId!: number;
  eventoForm: FormGroup;
  evento = {} as Evento;
  estadoSalvar = 'post';
  loteAtual = {id: 0, nome: '', indice: 0};

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get f(): any {
    return this.eventoForm.controls;
  }

  get lotes(): FormArray {
    return this.eventoForm.get('lotes') as FormArray;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:mm',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  get bsConfigLote(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private loteService: LoteService,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.localeService.use('pt-br');

    this.eventoForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemUrl: ['', Validators.required],
      lotes: this.fb.array([])
    });
  }

  ngOnInit() {
    this.carregarEvento();
  }

  public adicionarLote(): void {
    
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }

  public criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim]
    })
  }

  public carregarEvento(): void {
    this.eventoId = +this.activatedRouter.snapshot.paramMap.get('id')!;

    if (this.eventoId != null && this.eventoId != 0)  {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(this.eventoId).subscribe({
        next: (evento: Evento) => {
          this.evento = { ...evento };

          if (this.evento.dataEvento) {
            this.evento.dataEvento = new Date(this.evento.dataEvento);  // Converte para Date
          }
  
          // Atualiza os lotes com a conversão das datas
          if (this.evento.lotes && this.evento.lotes.length > 0) {
            this.evento.lotes.forEach(lote => {
              if (lote.dataInicio) lote.dataInicio = new Date(lote.dataInicio);
              if (lote.dataFim) lote.dataFim = new Date(lote.dataFim);
            });
          }

          this.eventoForm.patchValue(this.evento);
          this.carregarLotes();
        },
        error: (error: any) => {
          this.toastr.error('Erro ao tentar carregar evento.', 'Erro!');
          console.error(error);
        }
      }).add(() => this.spinner.hide());
    }
  }

  public carregarLotes(): void {
    this.loteService.getLotesByEventoId(this.eventoId).subscribe({
      next: (lotesRetorno: Lote[]) => {
        lotesRetorno.forEach(lote => {
          if (lote.dataInicio) lote.dataInicio = new Date(lote.dataInicio);
          if (lote.dataFim) lote.dataFim = new Date(lote.dataFim);

          this.lotes.push(this.criarLote(lote));
        });
      },
      error: (error: any) => {
        this.toastr.error('Erro ao tentar carregar lotes.', 'Erro!');
          console.error(error);
      }
    }).add(() => this.spinner.hide());
  }

  public resetForm(): void {
    this.eventoForm.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl | null): any {
    return { 'is-invalid': campoForm?.errors && campoForm?.touched };
  }

  public salvarEvento(): void {
    if (this.eventoForm.valid) {
      this.spinner.show();
      this.evento = (this.estadoSalvar == 'post')
        ? { ... this.eventoForm.value }
        : { id: this.evento.id, ... this.eventoForm.value };

      if (this.estadoSalvar == 'post' || this.estadoSalvar == 'put') {
        this.eventoService[this.estadoSalvar](this.evento).subscribe({
          next: (eventoRetorno: Evento) => {
            this.toastr.success('Evento salvo com sucesso!', 'Sucesso');
            this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
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

  public salvarLotes(): void {

    if(this.eventoForm.get('lotes')?.valid){
      this.spinner.show();
      this.loteService.saveLote(this.eventoId, this.eventoForm.value.lotes).subscribe({
        next: () => { 
          this.toastr.success('Lotes salvos com sucesso!', 'Sucesso');
        },
        error: (error: any) => {
          this.toastr.error('Erro ao tentar salvar lotes', 'Erro');
          console.error(error);
        },
        complete: () => {}
      }).add(() => this.spinner.hide());
    }
  }

  public removerLote(template: TemplateRef<any>, indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + '.id')?.value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome')?.value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmDeleteLote(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.loteService.deleteLote(this.eventoId, this.loteAtual.id).subscribe({
      next: () => {
        this.toastr.success('Lote deletado com sucesso!', 'Sucesso!');
        this.lotes.removeAt(this.loteAtual.indice);
      },
      error: (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o lote id: ${this.loteAtual.id}`, 'Erro');
        console.error(error);
      }
    }).add(() => this.spinner.hide());
  }

  public declineDeleteLote(): void {
    this.modalRef?.hide();
  }

  public retornaTituloLote(nome: string): string{
    return nome == null || nome == ''
                ? 'Nome do Lote'
                : nome;
  }
}
