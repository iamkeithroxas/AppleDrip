import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JwtModule } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }
  fetchGroups() {
    return this.http.get<any>('http://127.0.0.1:8000/api/groups');
  }
  createGroups(params:any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/creategroup',params);
  }
  joinGroups(params:any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/joingroup',params);
  }
  fetchUserGroups(params:any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/user_groups',params);
  }
  
}
