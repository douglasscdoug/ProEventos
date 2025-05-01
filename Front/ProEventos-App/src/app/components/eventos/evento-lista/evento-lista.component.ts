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
import { debounceTime, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginatedResult, Pagination } from '@app/models/Pagination';

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
    RouterLink,
    PaginationModule
  ],
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {
  public modalRef?: BsModalRef;
  public message?: string;
  public eventos: Evento[] = [];
  public eventoId = 0;
  public mostrarImagem = true;
  public pagination = {} as Pagination;
  public termoBuscaChanged: Subject<string> = new Subject<string>();

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pagination = { currentPage: 1, itemsPerPage: 3 } as Pagination;

    this.termoBuscaChanged
        .pipe(debounceTime(1000))
        .subscribe((filtrarPor) => {
          this.spinner.show();
          this.eventoService.getEventos(this.pagination.currentPage, this.pagination.itemsPerPage, filtrarPor).subscribe({
            next: (response: PaginatedResult<Evento[]>) => {
              this.eventos = response.result ?? [];
              this.pagination = response.pagination ?? new Pagination;
            },
            error: (error) => {
              this.spinner.hide();
              this.toastr.error('Erro ao carregar os eventos', 'Erro')
            }
          }).add(() => this.spinner.hide());
        });

    this.carregarEventos();
  }

  public filtrarEventos(evt: any): void {
    this.termoBuscaChanged.next(evt.value);
  }

  public alterarImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public mostraImagem(imagemURL: string): string {
    return (imagemURL !== '')
      ? `${environment.apiUrl}resources/images/${imagemURL}`
      : 'assets/semImagem.jpeg';
  }

  public carregarEventos(): void {
    this.eventoService.getEventos(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
      next: (response: PaginatedResult<Evento[]>) => {
        this.eventos = response.result ?? [];
        this.pagination = response.pagination ?? new Pagination;
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos', 'Erro')
      }
    }).add(() => this.spinner.hide());
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
        if (result.message == 'Deletado') {
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

  public pageChanged(event: PageChangedEvent): void {
    this.pagination.currentPage = event.page;
    this.carregarEventos();
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}