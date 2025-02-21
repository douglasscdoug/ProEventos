import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss',
  standalone: true,
  imports: [CommonModule, CollapseModule, FormsModule]
})
export class EventosComponent {
  constructor(private http: HttpClient) {
    this.getEventos();
  }

  public eventos : any = [];
  public eventosFiltrados: any = [];

  mostrarImagem = true;
  private _filtroLista = '';

  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
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
    this.http.get('http://localhost:5241/api/Eventos').subscribe({
      next: (data) => {
        this.eventos = data;
        this.eventosFiltrados = this.eventos;
      },
      error: (error) =>{
        console.error('Erro ao buscar eventos:', error)
      },
      complete: () => {
        console.log('Requisição completa');
      }
    });
  }
}
