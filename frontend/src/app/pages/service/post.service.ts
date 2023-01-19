import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  fetchFeeds() {
    return this.http.get<any>('http://127.0.0.1:8000/api/fetch_post');
  }

 InsertPost(params: Object) {
  return this.http.post<any>('http://127.0.0.1:8000/api/insert_post', params);
 }

 
}
