import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

interface LoginResponse {
  token: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) {}

  connect(username: string, password: string) {
    this.http
      .post<LoginResponse>(this.authUrl + 'login', { username, password })
      .pipe(
        catchError((error) => {
          console.error('API Error : ', error);
          throw new Error('Something went wrong with API call');
        })
      )
      .subscribe((res) => {
        this.storeJwt(res.token);
      });
  }

  storeJwt(token: string) {
    sessionStorage.setItem('jwt', token);
  }

  disconnect() {
    sessionStorage.removeItem('jwt');
  }

  getToken() {
    return sessionStorage.getItem('jwt');
  }
}
