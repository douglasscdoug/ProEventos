import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { Palestrante } from '@app/models/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, finalize, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-palestrante-lista',
  imports: [CommonModule, PaginationModule, ReactiveFormsModule],
  templateUrl: './palestrante-lista.component.html',
  styleUrl: './palestrante-lista.component.scss'
})
export class PalestranteListaComponent implements OnInit {
  public palestrantes: Palestrante[] = [];
  public pagination = {} as Pagination;
  public termoBuscaChanged: Subject<string> = new Subject<string>();
  public searchControl = new FormControl('', { nonNullable: true });
  //Paginação
  public total = 0;
  public pageSize = 6;
  public page = 1;
  public loading = false;

  constructor(
    private spinner: NgxSpinnerService,
    private palestranteService: PalestranteService,
    private toastr: ToastrService,
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
          }
    )
  }

  public buscar(search: string): void{
    this.loading = true;

    const filtro = {
      search,
      page: this.page,
      pageSize: this.pageSize,
      orderBy: '',
      desc: false
    }

    this.palestranteService.filtrar(filtro)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (res) => {
        this.palestrantes = res.data;
        this.total = res.total;
        this.cdr.detectChanges();
      }})
  }

  public filtrarPalestrantes(evt: any): void {
    this.termoBuscaChanged.next(evt.value);
  }

  public getImagemUrl(imagemUrl: string | any): string {
    if (imagemUrl)
      return imagemUrl;

    return './assets/images/perfil.png';
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
}
