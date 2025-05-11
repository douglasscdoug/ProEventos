import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '../../../shared/titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PerfilDetalheComponent } from "./perfil-detalhe/perfil-detalhe.component";
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '@app/services/account.service';
import { environment } from 'src/environments/environment';
import { PalestranteDetalheComponent } from "../../palestrantes/palestrante-detalhe/palestrante-detalhe.component";
import { RedesSociaisComponent } from "../../redes-sociais/redes-sociais.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [TituloComponent, ReactiveFormsModule, CommonModule, TabsModule, PerfilDetalheComponent, PalestranteDetalheComponent, RedesSociaisComponent]
})
export class PerfilComponent implements OnInit {
  public usuario = {} as UserUpdate;
  public imagemURL = '';
  public file!: File;

  public get ehPalestrante(): boolean {
    return this.usuario.funcao === 'Palestrante';
  }

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {}

  ngOnInit() {}

  public setFormValue(usuario: UserUpdate): void {
    this.usuario = usuario;
    if(usuario.imagemUrl)
      this.imagemURL = environment.apiUrl + `resources/perfil/${this.usuario.imagemUrl}`;
    else
      this.imagemURL = './assets/images/perfil.png';
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

  private uploadImagem(): void {
    this.spinner.show();
    this.accountService.postUpload(this.file).subscribe(
      () => this.toastr.success('Imagem atualizada com sucesso!', 'Sucesso!'),
      (error: any) => {
        this.toastr.error('Erro ao fazer upload da imagem', 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }
}
