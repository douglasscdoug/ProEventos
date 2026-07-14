import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategoriaDescricao } from '@app/models/enums/categoria-descricao';
import { Categoria } from '@app/models/enums/categoria.enum';
import { Parceiro } from '@app/models/parceiro';
import { ParceiroService } from '@app/services/parceiro.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, finalize } from 'rxjs';

@Component({
  selector: 'app-parceiro-lista',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CollapseModule, PaginationModule],
  templateUrl: './parceiro-lista.component.html',
  styleUrl: './parceiro-lista.component.scss'
})
export class ParceiroListaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private parceiroService = inject(ParceiroService);
  private cdr = inject(ChangeDetectorRef);
  private modalService = inject(BsModalService);
  private spinner = inject(NgxSpinnerService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  public modalRef?: BsModalRef;
  public message?: string;
  public parceiroId = 0;
  public parceiros: Parceiro[] = [];
  public ativarParceiro = false;
  public filtroForm = this.fb.group({
    nome: [''],
    categoria: [''],
    ativo: [null]
  }, { updateOn: 'change' });

  public categorias = Object.values(Categoria);
  public categoriaDescricao = CategoriaDescricao;
  public mostrarImagem = true;
  //Paginação
  public total = 0;
  public page = 1;
  public pageSize = 10;
  public loading = false;
  public orderBy = '';
  public desc = false;

  ngOnInit(): void {
    this.buscar();

    this.filtroForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        if (this.page !== 1) this.page = 1;

        this.buscar();
      })
  }

  public buscar(): void {
    this.loading = true;

    const filtro = {
      ...this.filtroForm.value,
      page: this.page,
      pageSize: this.pageSize,
      orderBy: this.orderBy,
      desc: this.desc
    };

    this.parceiroService.filtrar(filtro)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (res) => {
          this.parceiros = res.data;
          this.total = res.total;
          this.cdr.detectChanges();
        }
      })
  }

  public ordenar(coluna: string): void {
    if (this.orderBy === coluna) {
      this.desc = !this.desc;
    } else {
      this.orderBy = coluna;
      this.desc = false;
    }

    this.page = 1;
    this.buscar();
  }

  public alterarImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public mostraImagem(imagemURL: string ): string {
    return (imagemURL === '' || imagemURL === null)
      ?'assets/images/semImagem.jpeg'
      : imagemURL;
      // : 'assets/images/semImagem.jpeg';
  }

  public openModal(event: any, template: TemplateRef<void>, parceiroId: number, ativo: boolean) {
    event.stopPropagation();
    this.parceiroId = parceiroId;
    this.ativarParceiro = !ativo;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.parceiroService.alterarStatus(this.parceiroId)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: () => {
          this.toastr.success('Parceiro desativado com sucesso', 'Sucesso');
          this.buscar();
        }
      })
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  detalheParceiro(id: number): void {
    this.router.navigate([`parceiros/detalhe/${id}`]);
  }

  public onPageSizeChange(event: any) {
    this.pageSize = +event.target.value;
    this.page = 1;
    this.buscar();
  }

  public pageChanged(event: PageChangedEvent): void {
      this.page = event.page;
      this.buscar();
    }
}
