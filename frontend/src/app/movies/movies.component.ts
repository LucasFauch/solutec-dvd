import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { Movie } from './movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  onlyFavourites = false;

  constructor(
    private moviesService: MoviesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.moviesService
      .getAllMovies()
      .subscribe((movies) => (this.movies = movies));
  }

  addFavourite(movieId: string) {
    this.moviesService.addFavourite(movieId).subscribe({
      next: () => {
        const index = this.movies.findIndex(
          (movie) => movie.movieId == movieId
        );
        this.movies[index].favourite = true;
        this.snackBar.open('Movie added to favourites !', '', {
          duration: 2000,
        });
      },
    });
  }

  deleteFavourite(movieId: string) {
    this.moviesService.deleteFavourite(movieId).subscribe({
      next: () => {
        const index = this.movies.findIndex(
          (movie) => movie.movieId == movieId
        );
        this.movies[index].favourite = false;
        this.snackBar.open('Movie removed from favourites', '', {
          duration: 2000,
        });
      },
    });
  }

  filteredMovies() {
    return this.movies.filter((movie) => movie.favourite);
  }
}
