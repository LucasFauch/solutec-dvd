import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  formats: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (movieId)
        this.moviesService.getMovieById(movieId).subscribe((movie) => {
          this.movie = movie;
          if (movie.stock.demat) this.formats.push('Dematerialized');
          if (movie.stock.dvd) this.formats.push('DVD');
          if (movie.stock.bluRay) this.formats.push('Blu-Ray');
        });
    });
  }
}
