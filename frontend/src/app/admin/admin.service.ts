import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

export interface RentInfo {
  rentId: string;
  username: string;
  rentType: string;
  movieName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  baseUrl = `${environment.apiUrl}/movies/rents`;

  getRents() {
    return this.http.get<RentInfo[]>(this.baseUrl);
  }

  giveBack(rentId: string) {
    return this.http.delete(this.baseUrl + `/${rentId}`);
  }
}
