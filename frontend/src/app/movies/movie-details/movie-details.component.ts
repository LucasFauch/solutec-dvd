import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentsService } from './comments.service';
import { MatIconModule } from '@angular/material/icon';
import { Comment } from './comment';
import { AuthService } from '../../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  formats: string[] = [];
  isAlreadyRented = false;
  selectedFormat: string | null = null;
  comments: Comment[] = [];
  userId = '';
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private snackBar: MatSnackBar,
    private commentsService: CommentsService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (movieId) {
        this.commentsService.getMovieComments(movieId).subscribe((comments) => {
          this.comments = comments;
        });
        this.moviesService.getMovieById(movieId).subscribe((movie) => {
          this.movie = movie;
          if (movie.stock.demat) this.formats.push('Dematerialized');
          if (movie.stock.dvd) this.formats.push('DVD');
          if (movie.stock.bluRay) this.formats.push('Blu-Ray');
        });
      }
    });

    this.moviesService.getRents().subscribe((movies) => {
      const rentedMovieIds = movies.map((movie) => movie.movieName);
      this.isAlreadyRented = rentedMovieIds.includes(this.movie.title);
    });

    this.userId = this.authService.getUserId()!;
  }

  rent() {
    console.log('ouais');
    this.moviesService
      .rent(this.movie.movieId, this.selectedFormat!)
      .subscribe({
        next: () => {
          this.snackBar.open('Movie successfully rented !', '', {
            duration: 2000,
          });
          this.isAlreadyRented = true;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteComment(commentId: string) {
    this.commentsService.deleteComment(commentId).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  openCommentDialog() {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      width: '500px',
      data: { comment: this.newComment },
    });

    dialogRef.afterClosed().subscribe((comment) => {
      if (comment) {
        this.commentsService.addComment(this.movie.movieId, comment).subscribe({
          next: () => {
            window.location.reload();
          },
        });
      }
    });
  }
}
