import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from '../profile/edit-profile-modal/edit-profile-modal.component';
import { ProfileService } from '../service/profile.service';
import { FeedModel } from '../model/feed.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  UserId?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  date_joined?: Date;
  profileImage?: string;
  active = 1;
  feeds: FeedModel[] = [];

  loggedUser?: number = 0;



  profileForm = new FormGroup({
    username: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private modalService: NgbModal,
    private profileService: ProfileService,
    private routes: Router,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.UserId = params['id']
    })
    this.getUserProfile();
    this.loadPost();

    
  }

  getUserProfile() {
    var data = JSON.parse(localStorage.getItem('user')!);
    console.log(data);
    if (data != null) {
      this.loggedUser = data.id;
    }
    this.profileService.fetchUserInfo({"user_id": this.UserId}).subscribe(data =>{
      console.log(data, 'member')
      if (data != null) {
      // this.UserId = data.id;
      this.firstname = data[0].first_name;
      this.lastname = data[0].last_name;
      this.email = data[0].email;
      this.date_joined = data[0].date_joined;
      this.profileImage = data[0].image;
      
    }
    console.log(this.firstname, 'name')
    })
  }

  open() {
    const modalRef = this.modalService.open(EditProfileModalComponent, {
      windowClass: 'editProfile-Modal',
    });
    modalRef.componentInstance.name = 'World';
  }

  loadPost() {
    this.profileService
      .fetchProfilePost({ user_id: this.UserId })
      .subscribe((data) => {
        // console.log(data, 'profile post');
        this.feeds = data;
      });
  }
}
