import { Component } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../service/auth.service';
import { GroupService } from '../service/group.service';
import { GroupModel } from '../model/group'
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
  // group_id: number = 1;
  // group_name?: string;
  // created_at?: string;


  groups: GroupModel[] = [];


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
    // this.getUserProfile();
    this.fetchGroups();
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
  }

  
}

