import { Component, OnInit } from '@angular/core';
import { RentInfo } from '../admin/admin.service';
import { MatTableModule } from '@angular/material/table';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-rents',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './rents.component.html',
  styleUrl: './rents.component.scss',
})
export class RentsComponent implements OnInit {
  movieRents: RentInfo[] = [];
  displayedColumns = ['movieName', 'rentType'];

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.getUserRents().subscribe((rents) => {
      this.movieRents = rents;
    });
  }
}
