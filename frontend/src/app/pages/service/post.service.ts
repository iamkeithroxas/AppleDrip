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

  fetchPost(params: Object) {
    return this.http.post<any>(
      'http://127.0.0.1:8000/api/retrieve_user_post',
      params
    );
  }

  UpdatePost(post_id: number, params: Object) {
    return this.http.put<any>(
      'http://127.0.0.1:8000/api/update_post/' + post_id + '/',
      params
    );
  }

  DeletePost(post_id: number) {
    return this.http.delete<any>(
      'http://127.0.0.1:8000/api/delete_post/' + post_id + '/'
    );
  }
}
