import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class EventosComponent {
  constructor(private http: HttpClient) {
    this.getEventos();
  }

  public eventos : any;

  public getEventos() : void {
    this.http.get('http://localhost:5241/api/Eventos').subscribe({
      next: (data) => {
        this.eventos = data;
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
