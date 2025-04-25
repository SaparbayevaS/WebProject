
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://example.com/api/movies';  

  constructor(private http: HttpClient, private authService: AuthService) {}


  getMovies(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
    
    return this.http.get<any>(this.apiUrl, { headers });
  }
}