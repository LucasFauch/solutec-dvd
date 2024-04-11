import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.disconnect();
  }

  connect() {
    this.authService
      .connect(this.username, this.password)
      .pipe(
        catchError((error) => {
          this.error = 'Wrong credentials';
          console.error('API Error : ', error);
          throw new Error('Something went wrong with API call');
        })
      )
      .subscribe(({ token }) => {
        this.authService.storeJwt(token);
        this.router.navigate(['movies']);
      });
  }
}
