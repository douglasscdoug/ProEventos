import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/identity/User';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { map, Observable, ReplaySubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User | null>(1);
  private tokenKey = 'token';
  public currentUser$ = this.currentUserSource.asObservable();

  baseURL = environment.apiUrl + 'api/Account/'

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      this.currentUserSource.next(user);
    }
  }

  public login(model: any): Observable<void> {
    return this.http.post<User>(this.baseURL + 'login', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.setToken(user.token!);
          this.setRefreshToken(user.refreshToken!);
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.currentUserSource.next(null);
  }

  public updateUser(model: UserUpdate): Observable<void> {
    return this.http.put<UserUpdate>(this.baseURL + 'updateUser', model).pipe(
      take(1),
      map((user: UserUpdate) => {
        this.setCurrentUser(user);
      })
    )
  }

  public postUpload(file: File): Observable<UserUpdate> {
    //const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', file, file.name)

    return this.http.post<UserUpdate>(`${this.baseURL}upload-image`, formData).pipe(take(1));
  }

  public register(model: any): Observable<void> {
    return this.http.post<User>(this.baseURL + 'register', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.setToken(user.token!);
          this.setRefreshToken(user.refreshToken!);
        }
      })
    );
  }

  public refreshToken() {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    return this.http.post<any>(this.baseURL + 'refresh', { refreshToken });
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  public getUser(): Observable<UserUpdate> {
    return this.http.get<UserUpdate>(this.baseURL + 'getUser').pipe(take(1));
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  public setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}