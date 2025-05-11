import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RedeSocial } from '@app/models/RedeSocial';
import { RedeSocialService } from '@app/services/redeSocial.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-redes-sociais',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './redes-sociais.component.html',
  styleUrl: './redes-sociais.component.scss'
})
export class RedesSociaisComponent implements OnInit {
  public modalRef?: BsModalRef;
  @Input() eventoId = 0;
  public formRS: FormGroup;
  public redeSocialAtual = { id: 0, nome: '', indice: 0 };

  public get redesSociais(): FormArray {
      return this.formRS.get('redesSociais') as FormArray;
    }

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private redeSocialService: RedeSocialService
  ) {
    this.formRS = this.fb.group({
      redesSociais: this.fb.array([])
    })
   }

  ngOnInit(): void {
    this.carregarRedesSociais(this.eventoId);
  }

  public adicionarRedeSocial(): void {
    this.redesSociais.push(this.criarRedeSocial({ id: 0 } as RedeSocial));
  }

  public criarRedeSocial(redeSocial: RedeSocial): FormGroup {
    return this.fb.group({
      id: [redeSocial.id],
      nome: [redeSocial.nome, Validators.required],
      url:[redeSocial.url, Validators.required]
    })
  }

  private carregarRedesSociais(id: number = 0): void {
    let origem = 'palestrante';

    if(this.eventoId != 0) origem = 'evento';

    this.spinner.show();
    
    this.redeSocialService.getRedesSociais(origem, id).subscribe({
      next: (redeSocialRetorno: RedeSocial[]) => {
        redeSocialRetorno.forEach((redeSocial) => {
          this.redesSociais.push(this.criarRedeSocial(redeSocial));
        })
      },
      error: (error: any) => {
        this.toastr.error('Erro ao tentar carregar redes sociais', 'Erro!');
        console.error(error);
      }
    }).add(() => this.spinner.hide());
  }

  public cssValidator(campoForm: FormControl | AbstractControl | null): any {
    return { 'is-invalid': campoForm?.errors && campoForm?.touched };
  }

  public salvarRedesSociais(): void {
    let origem = 'palestrante';

    if(this.eventoId != 0) origem = 'evento';

    if (this.formRS.get('redesSociais')?.valid) {
      this.spinner.show();
      this.redeSocialService.saveRedesSociais(origem, this.eventoId, this.formRS.value.redesSociais).subscribe({
        next: () => {
          this.toastr.success('Redes sociais salvas com sucesso!', 'Sucesso');
        },
        error: (error: any) => {
          this.toastr.error('Erro ao tentar salvar redes sociais', 'Erro');
          console.error(error);
        },
        complete: () => { }
      }).add(() => this.spinner.hide());
    }
  }

  public removerRedeSocial(template: TemplateRef<any>, indice: number): void {
    this.redeSocialAtual.id = this.redesSociais.get(indice + '.id')?.value;
    this.redeSocialAtual.nome = this.redesSociais.get(indice + '.nome')?.value;
    this.redeSocialAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirmDeleteRedeSocial(): void {
    let origem = 'palestrante';
    this.modalRef?.hide();
    this.spinner.show();
    
    if(this.eventoId != 0) origem = 'evento';

    this.redeSocialService.deleteRedeSocial(origem, this.eventoId, this.redeSocialAtual.id).subscribe({
      next: () => {
        this.toastr.success('RedeSocial deletado com sucesso!', 'Sucesso!');
        this.redesSociais.removeAt(this.redeSocialAtual.indice);
      },
      error: (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o rede social id: ${this.redeSocialAtual.id}`, 'Erro');
        console.error(error);
      }
    }).add(() => this.spinner.hide());
  }

  public declineDeleteRedeSocial(): void {
    this.modalRef?.hide();
  }

  public retornaTitulo(nome: string): string {
    return nome == null || nome == ''
      ? 'Rede Social'
      : nome;
  }
}