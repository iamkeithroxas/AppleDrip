import { Component } from '@angular/core';
import { FriendsService } from '../service/friends.service';
import { UserModel } from '../model/users-model';
import { FriendModel } from '../model/friend-model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent {
  users: UserModel[] = [];
  friendRequest: UserModel[] = [];
  friends: FriendModel[] = [];

  globalFriendRequestData = [];
  globalUserData = [];
  globalFriendData = [];
  UserId: number = 1;
  firstname?: string;
  lastname?: string;
  email?: string;
  date_joined?: Date;
  constructor(private service: FriendsService) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.fetchFriends();
    this.fetchUsers();
  }

  fetchUsers() {
    this.service.fetchUsers().subscribe((data) => {
      // this.users = data;
      this.globalUserData = data;
      console.log(this.globalUserData, 'wew');
      this.FetchUserFriendRequest();
    });
  }

  fetchFriends() {
    this.service
      .fetchUserFriends({ user_id: this.UserId })
      .subscribe((data) => {
        this.friends = data;
        this.globalFriendData = data;
        console.log(this.globalFriendData, 'lol');
      });
  }

  getUserProfile() {
    var data = JSON.parse(localStorage.getItem('user')!);
    console.log(data);
    if (data != null) {
      this.UserId = data.id;
      this.firstname = data.first_name;
      this.lastname = data.last_name;
      this.email = data.email;
      this.date_joined = data.date_joined;
    }
  }

  FetchUserFriendRequest() {
    this.service.fetchUserFriendRequest({ user_id: this.UserId }).subscribe((data) => {
      this.globalFriendRequestData = data;
      this. friendRequest = data
      console.log(this.globalFriendRequestData, 'po');
      this.checkUserFriend();
    });
  }

  checkUserFriend() {
    let array = this.globalUserData;
    let array2 = this.globalFriendData;
    console.log(this.globalUserData, 'user');
    console.log(this.globalFriendRequestData, 'friendreq');
    var data = [];
    for (let x = 0; x < array.length; x++) {
      for (let i = 0; i < array2.length; i++) {
        if (array[x]['id'] != array2[i]['friend_id'] && array2[i]['status'] == 1) {
          if (
            !this.checkItemOnArray(
              this.globalFriendRequestData,
              array[x]['id']
            ) &&
            !this.checkItemOnArray(this.globalFriendRequestData, array[x]['id'])
          )
            data.push({
              id: array[x]['id'],
              first_name: array[x]['first_name'],
              last_name: array[x]['last_name'],
              email: array[x]['email'],
              date_joined: array[x]['date_joined'],
            });
        }
      }
    }
    console.log(data, 'ey');
    this.users = data;
  }

  checkItemOnArray(array: any, value: any) {
    var isTrue = null;
    for (var x = 0; x < array.length; x++) {
      if (array[x]['user_id'] == value) {
        isTrue = true;
        break;
      }
    }
    return isTrue;
  }

  AddFriend(e: any) {
    this.service.createFriendRequest({'user_id': this.UserId, "friend_id": e}).subscribe(data => {
        this.FetchUserFriendRequest();
    })
  }

}
