import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { phoneValidator } from '@app/helpers/Phone.Validator';
import { CategoriaDescricao } from '@app/models/enums/categoria-descricao';
import { Categoria } from '@app/models/enums/categoria.enum';
import { Parceiro } from '@app/models/parceiro';
import { ParceiroService } from '@app/services/parceiro.service';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-parceiro-detalhe',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './parceiro-detalhe.component.html',
  styleUrl: './parceiro-detalhe.component.scss'
})
export class ParceiroDetalheComponent implements OnInit{
  private fb = inject(FormBuilder);
  private parceiroService = inject(ParceiroService);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);

  public parceiroId!: number;
  public isEditMode: boolean = !!this.parceiroId;
  public categorias = Object.values(Categoria);
  public categoriaDescricao = CategoriaDescricao;
  public imagemURL = 'assets/images/upload.png';
  public parceiro = {} as Parceiro;
  public file!: File;

  public form: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    categoria: ['', Validators.required],
    responsavel: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, phoneValidator]],
    site: [''],
    observacao: [''],
    ativo: true
  })

  public get f(): any {
    return this.form.controls;
  };

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.parceiroId = +this.activatedRoute.snapshot.paramMap.get('id')!;
      this.isEditMode = !!this.parceiroId;

      if(this.isEditMode) this.load(this.parceiroId!);
    })
  }

  public isInvalid(path: string): boolean {
    const control = this.form.get(path);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  public resetForm(): void {
    this.form.reset();
  }

  public salvar(): void{
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.spinner.show();

    const data = { ...this.form.value };

    const request = this.isEditMode
      ? this.parceiroService.put(data, this.parceiroId)
      : this.parceiroService.post(data);

    request
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (res) => {
          this.toastr.success('Parceiro salvo com sucesso!', 'Sucesso');
          this.router.navigate([`parceiros/detalhe/${res.id}`]);
        }
      })
  }

  public load(id: number): void {
    this.parceiroService.getById(id).subscribe((res) => {
      this.parceiro = res;
      this.form.patchValue(res);

      if(!(this.parceiro.imagemUrl === '' || this.parceiro.imagemUrl === null)){
            this.imagemURL = this.parceiro.imagemUrl;
          }
    })
  }

  public onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    const files: FileList = ev.target.files;

    if (files.length > 0) {
      this.file = files[0];
      reader.readAsDataURL(files[0]);
    }

    this.uploadImagem();
  }

  public uploadImagem(): void {
    this.spinner.show();
    this.parceiroService.postUpload(this.parceiroId, this.file).subscribe({
      next: () => {
        this.load(this.parceiroId);
        this.toastr.success('Imagem atualizada com sucesso', 'sucesso!');
      },
      error: (error: any) => {
        this.toastr.error('Erro ao fazer upload da imagem', 'Erro!!');
        console.error(error);
      }
    }).add(() => this.spinner.hide());
  }
}
