import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RedeSocial } from '@app/models/RedeSocial';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedeSocialService {
  public baseURL = environment.apiUrl + 'api/RedesSociais';

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param origem Precisa passar a palavra "palestrante" ou "evento" em minusculo
   * @param id Precisa passar o palestranteId ou o eventoId dependendo da origem
   * @returns Observable<RedeSocial[]>
   */
  public getRedesSociais(origem: string, id: number): Observable<RedeSocial[]> {
    let URL = id == 0 
      ? `${this.baseURL}/${origem}`
      : `${this.baseURL}/${origem}/${id}`

    return this.http.get<RedeSocial[]>(URL).pipe(take(1));
  }

  /**
   * 
   * @param origem Precisa passar a palavra "palestrante" ou "evento" em minusculo
   * @param id Precisa passar o palestranteId ou o eventoId dependendo da origem
   * @param redesSociais Precisa adicionar redes socias organizadas em RedeSocial[]
   * @returns Observable<RedeSocial[]>
   */
  public saveRedesSociais(origem: string, id: number, redesSociais: RedeSocial[]): Observable<RedeSocial[]> {
    let URL = id == 0 
      ? `${this.baseURL}/${origem}`
      : `${this.baseURL}/${origem}/${id}`

    return this.http.put<RedeSocial[]>(URL, redesSociais).pipe(take(1));
  }

  /**
   * 
   * @param origem Precisa passar a palavra "palestrante" ou "evento" em minusculo
   * @param id Precisa passar o palestranteId ou o eventoId dependendo da origem
   * @param redeSocialId Precisa usar o id da rede social
   * @returns Observable<any>
   */
  public deleteRedeSocial(origem: string, id: number, redeSocialId: number): Observable<any> {
    let URL = id == 0 
      ? `${this.baseURL}/${origem}/${redeSocialId}`
      : `${this.baseURL}/${origem}/${id}/${redeSocialId}`

    return this.http.delete(URL).pipe(take(1));
  }
}
