import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedResult } from '@app/models/paged-result';
import { Parceiro } from '@app/models/parceiro';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService {
  public baseURL = environment.apiUrl + 'api/Parceiros';

  private http = inject(HttpClient);

  public filtrar(filtro: any): Observable<PagedResult<Parceiro>> {
    let params = new HttpParams;

    Object.keys(filtro).forEach(key => {
      const value = filtro[key];

      if (value !== null && value !== '') {
        params = params.set(key, value);
      }
    });

    return this.http.get<PagedResult<Parceiro>> (this.baseURL, {params});
  }

  public getById(id: number): Observable<Parceiro> {
    return this.http.get<Parceiro>(`${this.baseURL}/${id}`);
  }

  public post(parceiro: Parceiro): Observable<Parceiro> {
    return this.http.post<Parceiro>(this.baseURL, parceiro);
  }

  public put(parceiro: Parceiro, id: number): Observable<Parceiro>{
    return this.http.put<Parceiro>(`${this.baseURL}/${id}`, parceiro);
  }

  public alterarStatus(id: number): Observable<Parceiro>{
    return this.http.patch<Parceiro>(`${this.baseURL}/${id}/status`, {});
  }
}
