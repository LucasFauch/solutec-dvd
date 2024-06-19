import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment/environment';

interface LoginResponse {
  token: string;
  userId: string;
  admin: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/auth/`;

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

  storeAuth(token: string, userId: string, admin: string) {
    sessionStorage.setItem('jwt', token);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('admin', admin);
  }

  disconnect() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('admin');
  }

  getToken() {
    return sessionStorage.getItem('jwt');
  }

  getUserId() {
    return sessionStorage.getItem('userId');
  }

  getIsAdmin() {
    return sessionStorage.getItem('admin') == 'true';
  }
}
