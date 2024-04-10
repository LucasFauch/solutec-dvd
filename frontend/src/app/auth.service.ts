import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.post<LoginResponse>(this.authUrl + 'login', {
      username,
      password,
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
