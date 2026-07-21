import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dashboard } from '@app/models/dashboard';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);

  public baseURL = environment.apiUrl + 'api/DashBoard';

  public getDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.baseURL);
  }
}