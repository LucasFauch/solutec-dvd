import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesUrl = 'http://localhost:3000/movies/';

  constructor(private http: HttpClient) {}

  getAllMovies() {
    return this.http.get<Movie[]>(this.moviesUrl);
  }

  getMovieById(movieId: string) {
    return this.http.get<Movie>(this.moviesUrl + movieId);
  }
}