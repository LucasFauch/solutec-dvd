import { Component, OnInit } from '@angular/core';
import { AdminService, RentInfo } from './admin.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  movieRents: RentInfo[] = [];
  displayedColumns = ['username', 'movieName', 'rentType', 'giveBack'];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getRents();
  }

  getRents() {
    this.adminService.getRents().subscribe((movieRents) => {
      this.movieRents = movieRents;
    });
  }

  giveBack(rentId: string) {
    this.adminService.giveBack(rentId).subscribe(() => {
      this.snackBar.open('Movie returned to the stock !', '', {
        duration: 2000,
      });
      this.getRents();
    });
  }
}
