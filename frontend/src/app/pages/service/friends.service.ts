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

  fetchingUserFriends(params: any) {
    return this.http.post<any>(
      'http://127.0.0.1:8000/api/get_friends',
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

  fetchSentRequest(params: Object){
    return this.http.post<any>('http://127.0.0.1:8000/api/fetch_sent_request', params);
  }

  AcceptFriendRequest(request_id: number, params: object) {
    return this.http.put<any>('http://127.0.0.1:8000/api/accept_request/'+request_id+'/', params);
  }

  CancelFriendRequest(request_id: number) {
    return this.http.delete<any>('http://127.0.0.1:8000/api/delete_request/'+request_id+'/');
  }
}
