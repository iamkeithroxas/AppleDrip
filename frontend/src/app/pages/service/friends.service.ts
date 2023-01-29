import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private http: HttpClient) {}

  fetchUsers() {
    return this.http.get<any>('http://127.0.0.1:8000/api/users');
  }

  fetchUserFriends(params: any) {
    return this.http.post<any>(
      'http://127.0.0.1:8000/api/fetch_friends',
      params
    );
  }

  fetchUserFriendRequest(params: any) {
    return this.http.post<any>(
      'http://127.0.0.1:8000/api/fetch_friend_request',
      params
    );
  }

  createFriendRequest(params: any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/Addfriend', params);
  }
}
