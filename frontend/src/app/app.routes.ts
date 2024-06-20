import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { AdminComponent } from './admin/admin.component';
import { RentsComponent } from './rents/rents.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'rents', component: RentsComponent },
];
