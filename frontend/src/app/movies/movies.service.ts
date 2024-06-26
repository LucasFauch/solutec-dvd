import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { environment } from '../environment/environment';
import { RentInfo } from '../admin/admin.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  getAllMovies() {
    return this.http.get<Movie[]>(this.moviesUrl);
  }

  getMovieById(movieId: string) {
    return this.http.get<Movie>(this.moviesUrl + `/${movieId}`);
  }

  addFavourite(movieId: string) {
    return this.http.post(this.moviesUrl + `/favourites/${movieId}`, {});
  }

  deleteFavourite(movieId: string) {
    return this.http.delete(this.moviesUrl + `/favourites/${movieId}`);
  }

  getRents() {
    return this.http.get<Movie[]>(this.moviesUrl + '/userrents');
  }

  getUserRents() {
    return this.http.get<RentInfo[]>(this.moviesUrl + '/userrents');
  }

  rent(movieId: string, rentType: string) {
    return this.http.post(
      this.moviesUrl + `/rent/${movieId}/${rentType}`,
      null
    );
  }
}
