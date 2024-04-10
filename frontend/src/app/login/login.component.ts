import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

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
      .subscribe(() => this.router.navigate(['movies']));
  }
}
