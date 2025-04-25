
import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';


@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent implements OnInit {
  favourites: any[] = [];

  constructor(private favouriteService: FavouriteService) { }

  ngOnInit(): void {
    this.loadFavourites();
  }

  loadFavourites(): void {
    this.favouriteService.getFavourites().subscribe(
      data => {
        this.favourites = data;
      },
      error => {
        console.error('Error loading featured movies', error);
      }
    );
  }
}