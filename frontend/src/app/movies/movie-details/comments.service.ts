import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './comment';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private commentsUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  getMovieComments(movieId: string) {
    return this.http.get<Comment[]>(this.commentsUrl + `/${movieId}`);
  }

  deleteComment(commentId: string) {
    return this.http.delete(this.commentsUrl + `/${commentId}`);
  }

  addComment(movieId: string, comment: string) {
    return this.http.post(this.commentsUrl + `/${movieId}`, comment);
  }
}
