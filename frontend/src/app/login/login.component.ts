import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  response = '';
  mode = 'Login';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.disconnect();
  }

  connect() {
    this.authService.connect(this.username, this.password).subscribe({
      next: ({ token }) => {
        this.authService.storeJwt(token);
        this.router.navigate(['movies']);
      },
      error: () => {
        this.response = 'Wrong credentials';
      },
    });
  }

  register() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.response = 'Account successfully created';
      },
      error: ({ error }) => {
        this.response = error.errors.join(', ');
      },
    });
  }
}
