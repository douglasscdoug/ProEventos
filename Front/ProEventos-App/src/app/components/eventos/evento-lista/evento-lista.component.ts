import { ChangeDetectorRef, Component, DestroyRef, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '@app/services/evento.service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Evento } from '@app/models/Evento';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DateTimeFormatPipe } from '@app/helpers/DateTimeFormat.pipe';
import { Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    PaginationModule,
    ReactiveFormsModule
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
  public searchControl = new FormControl('', { nonNullable: true });
  //Paginação
  public total = 0;
  public page = 1;
  public pageSize = 5;
  public orderBy = '';
  public desc = false;
  public loading = false;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit() {
    this.buscar('');

    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef))
      .subscribe(search => {
        if (this.page !== 1) this.page = 1;
        this.buscar(search);
      })
  }

  public buscar(search: string): void {
    this.loading = true;

    const filtro = {
      search,
      page: this.page,
      pageSize: this.pageSize,
      orderBy: this.orderBy,
      desc: this.desc
    }

    this.eventoService.filtrar(filtro)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (res) => {
          this.eventos = res.data;
          this.total = res.total;
          this.cdr.detectChanges();
        }
      })
  }

  public filtrarEventos(evt: any): void {
    this.termoBuscaChanged.next(evt.value);
  }

  public ordenar(coluna: string): void {
    if (this.orderBy === coluna) {
      this.desc = !this.desc;
    }
    else {
      this.orderBy = coluna;
      this.desc = false;
    }

    this.page = 1;
    this.buscar(this.searchControl.value);
  }

  public alterarImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public mostraImagem(imagemURL: string | null | undefined): string {
    return imagemURL?.trim() || 'assets/images/semImagem.jpeg';
  }

  openModal(event: any, template: TemplateRef<void>, eventoId: number) {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: () => {
          this.toastr.success('Evento deletado com sucesso!', 'Sucesso!');
          this.buscar(this.searchControl.value);
        }
      });
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  public pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.buscar(this.searchControl.value);
  }

  public onPageSizeChange(event: any) {
    this.pageSize = +event.target.value;
    this.page = 1;
    this.buscar(this.searchControl.value);
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}