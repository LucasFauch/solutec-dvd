import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  token: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/auth/';

  constructor(private http: HttpClient) {}

  connect(username: string, password: string) {
    return this.http.post<LoginResponse>(this.authUrl + 'login', {
      username,
      password,
    });
  }

  register(username: string, password: string) {
    return this.http.post(this.authUrl + 'register', {
      username,
      password,
    });
  }

  storeAuth(token: string, userId: string) {
    sessionStorage.setItem('jwt', token);
    sessionStorage.setItem('userId', userId);
  }

  disconnect() {
    sessionStorage.removeItem('jwt');
  }

  getToken() {
    return sessionStorage.getItem('jwt');
  }

  getUserId() {
    return sessionStorage.getItem('userId');
  }
}
