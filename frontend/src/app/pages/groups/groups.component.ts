import { Component } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../service/auth.service';
import { GroupService } from '../service/group.service';
import { GroupModel } from '../model/group'
import {joinedGroupModel} from '../model/user_groups'
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
  value = 'Clear me';

  groupForm = new FormGroup({
  group_name: new FormControl('')
   
  });
  UserId: number = 1;
  firstname?: string;
  lastname?: string;
  email?: string;

  groups: GroupModel[] = [];
  u_groups: joinedGroupModel[] = [];

  jwtHelper = new JwtHelperService();

  constructor(
    private groupService: GroupService,
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) {}
  AddTask(){  
    this.fetchGroups();  
}  
  ngOnInit(): void {
    this.getUserProfile();
    this.fetchGroups();
    this.fetchUserGroups();
  }
  getUserProfile() {
    var data = JSON.parse(localStorage.getItem('user')!);
    console.log(data)
    if(data != null){
      this.UserId = data.id
      this.firstname = data.first_name;
      this.lastname = data.last_name;
      this.email = data.email;
    }
  }

  fetchGroups() {
    this.groupService.fetchGroups().subscribe((data) => {
      this.groups = data;
      this.groups.sort((a, b) => {
        const dt1 = Date.parse(a.created_at);
        const dt2 = Date.parse(b.created_at);

        if (dt1 < dt2) return 1;
        if (dt1 > dt2) return -1;
        return 0;
      });
      console.log(this.groups, 'group');
    });
  } 



  createGroup() {
    this.groupService.createGroups(this.groupForm.value).subscribe((data) => {
      this.fetchGroups();
      this.groupForm.reset();
    })
  }joinGroup(user_id:number, group_id: number) {
    this.groupService.joinGroups({"user_id":user_id, "group_id":group_id}).subscribe((data) => {
      this.fetchUserGroups();
      console.log(data);
      this.groupForm.reset();
    })
  }

  fetchUserGroups() {
    this.groupService.fetchUserGroups({"user_id":this.UserId}).subscribe((data) => {
      this.u_groups = data;
      this.u_groups.sort((a, b) => {
        const dt1 = Date.parse(a.joined_at);
        const dt2 = Date.parse(b.joined_at);

        if (dt1 < dt2) return 1;
        if (dt1 > dt2) return -1;
        return 0;
      });
      console.log(this.u_groups, 'group');
    });
  } 



  
}

