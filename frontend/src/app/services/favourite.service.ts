import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private apiUrl = 'http://localhost:8000/api/favourites/';

  constructor(private http: HttpClient) {}

  getFavourites(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addFavourite(movieId: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { movie_id: movieId });
  }

 
}