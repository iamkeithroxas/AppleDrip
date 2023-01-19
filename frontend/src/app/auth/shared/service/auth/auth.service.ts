import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(params: object) {
    return this.http.post<any>('http://127.0.0.1:8000/api/login', params);
  }

  User(){
    const token = localStorage.getItem('token');
    return this.http.get<any>('http://127.0.0.1:8000/api/user', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    });
  }
}
