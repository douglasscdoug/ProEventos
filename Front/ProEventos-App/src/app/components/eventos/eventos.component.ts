import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Evento';
import { DateTimeFormatPipe } from "../../helpers/DateTimeFormat.pipe";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TituloComponent } from "../../shared/titulo/titulo.component";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    CollapseModule,
    FormsModule,
    DateTimeFormatPipe,
    TooltipModule,
    ModalModule,
    ToastrModule,
    TituloComponent
],
  providers:[BsModalService]
})
export class EventosComponent implements OnInit{
  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    this.getEventos();
  }

  public modalRef?: BsModalRef;
  public message?: string;

  public eventos : Evento[] = [];
  public eventosFiltrados: Evento[] = [];

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

  public getEventos() : void {
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

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
 
  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Evento deletado com sucesso!', 'Sucesso!');
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }
}
