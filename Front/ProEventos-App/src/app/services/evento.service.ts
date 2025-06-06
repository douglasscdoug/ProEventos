import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Evento } from '../models/Evento';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '@app/models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  public baseURL = environment.apiUrl + 'api/Eventos';
  public userString = localStorage.getItem('user');
  public token = this.userString ? JSON.parse(this.userString).token : '';
  public tokenHeader = new HttpHeaders({ 'Authorization': `Bearer ${this.token}`});

  constructor(private http: HttpClient) { }

  public getEventos(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Evento[]>> {
    const paginatedResult: PaginatedResult<Evento[]> = new PaginatedResult<Evento[]>();

    let params = new HttpParams;

    if(page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if(term != null && term != '')
      params = params.append('term', term);

    return this.http.get<Evento[]>(this.baseURL, { observe: 'response', params }).pipe(take(1), map((response) => {
      paginatedResult.result = response.body ?? [];
      if(response.headers.has('Pagination')) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') || '{}');
      }
      return paginatedResult;
    }));
  }

  public getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public post(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseURL, evento).pipe(take(1));
  }

  public put(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento).pipe(take(1));
  }

  public salvarPalestranteDoEvento(eventoId: number, palestrantesDoEvento: { eventoId: number, palestranteId: number}[]): Observable<string> {
    return this.http.put<string>(`${this.baseURL}/palestrantes/${eventoId}`, palestrantesDoEvento).pipe(take(1));
  }

  public deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public postUpload(eventoId: number, file: File): Observable<Evento> {
    //const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', file, file.name)

    return this.http.post<Evento>(`${this.baseURL}/upload-image/${eventoId}`, formData).pipe(take(1));
  }
}
