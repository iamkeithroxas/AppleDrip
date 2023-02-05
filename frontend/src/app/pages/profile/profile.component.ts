import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { ProfileService } from '../service/profile.service';
import { FeedModel } from '../model/feed.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  UserId: number = 1;
  firstname?: string;
  lastname?: string;
  email?: string;
  date_joined?: Date;
  profileImage?: string;
  active = 1;
  feeds: FeedModel[] = [];

  profileForm = new FormGroup({
    username: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private modalService: NgbModal,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.loadPost();
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
      this.profileImage = data.image;
    }
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
