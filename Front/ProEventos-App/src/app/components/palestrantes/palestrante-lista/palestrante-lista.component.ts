import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { Palestrante } from '@app/models/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-palestrante-lista',
  imports: [CommonModule, PaginationModule],
  templateUrl: './palestrante-lista.component.html',
  styleUrl: './palestrante-lista.component.scss'
})
export class PalestranteListaComponent implements OnInit{
  public palestrantes: Palestrante[] = [];
  public pagination = {} as Pagination;
  public termoBuscaChanged: Subject<string> = new Subject<string>();

  constructor(
    private spinner: NgxSpinnerService,
    private palestranteService: PalestranteService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
      this.pagination = { currentPage: 1, itemsPerPage: 3 } as Pagination;
  
      this.termoBuscaChanged
          .pipe(debounceTime(1000))
          .subscribe((filtrarPor) => {
            this.spinner.show();
            this.palestranteService.getPalestrantes(this.pagination.currentPage, this.pagination.itemsPerPage, filtrarPor).subscribe({
              next: (response: PaginatedResult<Palestrante[]>) => {
                this.palestrantes = response.result ?? [];
                this.pagination = response.pagination ?? new Pagination;
              },
              error: (error) => {
                this.spinner.hide();
                this.toastr.error('Erro ao carregar os palestrantes', 'Erro');
                console.error(error);
              }
            }).add(() => this.spinner.hide());
          });

      this.carregarPalestrantes();
    }

  public filtrarPalestrantes(evt: any): void {
    this.termoBuscaChanged.next(evt.value);
  }

  public getImagemUrl(imagemName: string | any): string {
    if(imagemName) 
      return environment.apiUrl + `resources/perfil/${imagemName}`;
    else
      return './assets/images/perfil.png';
  }

  public carregarPalestrantes(): void {
    this.palestranteService.getPalestrantes(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
          next: (response: PaginatedResult<Palestrante[]>) => {
            this.palestrantes = response.result ?? [];
            this.pagination = response.pagination ?? new Pagination;
          },
          error: (error) => {
            this.spinner.hide();
            this.toastr.error('Erro ao carregar os palestrantes', 'Erro')
          }
        }).add(() => this.spinner.hide());
  }

  public pageChanged(event: PageChangedEvent): void {
      this.pagination.currentPage = event.page;
      this.carregarPalestrantes();
    }
}
