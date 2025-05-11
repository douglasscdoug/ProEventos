import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Palestrante } from '@app/models/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, map, tap } from 'rxjs';

@Component({
  selector: 'app-palestrante-detalhe',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './palestrante-detalhe.component.html',
  styleUrl: './palestrante-detalhe.component.scss'
})
export class PalestranteDetalheComponent implements OnInit {
  public form!: FormGroup;
  public statusForm = '';
  public corDaDescricao = '';

  public get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    public palestranteService: PalestranteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.validation();
    this.verificaForm();
    this.carregarPalestrante();
  }

  private carregarPalestrante(): void {
    this.spinner.show();
    this.palestranteService.getPalestrante().subscribe({
      next: (palestrante: Palestrante) => {
        this.form.patchValue(palestrante);
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error('Erro ao carregar palestrante', 'Erro!');
      }
    })
  }

  public verificaForm(): void {
    this.form.valueChanges.pipe(map(() => {
      this.statusForm = 'Minicurriculo em atualização';
      this.corDaDescricao = 'text-warning';
    }),
      debounceTime(1000),
      tap(() => this.spinner.show)
    ).subscribe(() => {
      this.palestranteService.put({ ...this.form.value }).subscribe({
        next: () => {
          this.statusForm = 'Minicurriculo atualizado!';
          this.corDaDescricao = 'text-success';

          setTimeout(() => {
            this.statusForm = 'Minicurriculo carregado!';
            this.corDaDescricao = 'text-muted';
          }, 2000)
        },
        error: (error: any) => {
          this.toastr.error('Erro ao tentar atualizar palestrante', 'Erro!');
          console.error(error);
        }
      }).add(() => this.spinner.hide());
    });
  }

  public validation(): void {
    this.form = this.fb.group({
      miniCurriculo: ['']
    })
  }
}