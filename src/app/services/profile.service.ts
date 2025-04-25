import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = `${environment.apiUrl}/profile`;  

  constructor(private http: HttpClient) {}

  getFavouriteMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favourite-movies/`);
  }

  
}