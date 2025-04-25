import { Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'register', component: RegisterComponent }

];
