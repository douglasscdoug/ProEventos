import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '@app/services/evento.service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Evento } from '@app/models/Evento';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DateTimeFormatPipe } from '@app/helpers/DateTimeFormat.pipe';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  imports: [
    CommonModule,
    CollapseModule,
    FormsModule,
    TooltipModule,
    DateTimeFormatPipe,
    ToastrModule,
    RouterLink
  ],
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    this.carregarEventos();
  }

  public modalRef?: BsModalRef;
  public message?: string;

  public eventos : Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public eventoId = 0;

  public mostrarImagem = true;
  private filtroListado = '';

  public get filtroLista(){
    return this.filtroListado;
  }

  public set filtroLista(value: string){
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento : {tema: string, local: string;}) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  public exibirImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public carregarEventos() : void {
    this.eventoService.getEventos().subscribe({
      next: (eventosResp: Evento[]) => {
        this.eventos = eventosResp;
        this.eventosFiltrados = this.eventos;
      },
      error: (error) =>{
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos', 'Erro')
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  openModal(event: any, template: TemplateRef<void>, eventoId: number) {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
 
  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe({
      next: (result: any) => {
        console.log(result);
        if (result.message == 'Deletado')
        {
          this.toastr.success('Evento deletado com sucesso!', 'Sucesso!');
          this.carregarEventos();
        }
      },
      error: (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o evento Id: ${this.eventoId}`, 'Erro');
      }
    }).add(() => this.spinner.hide());
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void{
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}
