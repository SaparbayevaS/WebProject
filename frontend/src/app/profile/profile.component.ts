import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../models/user-profile.model';
import { FavouriteMovie } from '../models/favourite-movie.model';
import { ProfileService } from '../services/profile.service';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  favouriteMovies: FavouriteMovie[] = [];
  isLoadingProfile = true;
  isLoadingFavourites = true;

  constructor(private http: HttpClient, private profileService: ProfileService, private favouriteService: FavouriteService) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadFavourites();
  }

  loadProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.http.get<UserProfile>('http://localhost:8000/api/profile/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.userProfile = data;
        this.isLoadingProfile = false;
      },
      error: () => {
        this.userProfile = null;
        this.isLoadingProfile = false;
      }
    });
  }

  loadFavourites() {
    const token = localStorage.getItem('authToken');
    if (!token) return;
  
    this.http.get<FavouriteMovie[]>('http://localhost:8000/api/favourites/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.favouriteMovies = data;
        console.log('Featured Movies Uploaded:', this.favouriteMovies);  
        this.isLoadingFavourites = false;
      },
      error: () => {
        console.error('Failed to load favorites');
        this.isLoadingFavourites = false;
      }
    });
  }
}