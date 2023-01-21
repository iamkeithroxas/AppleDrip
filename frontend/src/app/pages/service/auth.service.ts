import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  Logout() {
    return this.http.get<any>('http://127.0.0.1:8000/api/logout');
  }

  GetUserInfo() {
    return localStorage.getItem('user');
  }
}
