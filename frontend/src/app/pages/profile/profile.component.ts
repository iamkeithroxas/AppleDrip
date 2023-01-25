import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import {EditProfileModalComponent} from './edit-profile-modal/edit-profile-modal.component'

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
  constructor(private auth: AuthService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getUserProfile();
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
  open() {
    const modalRef = this.modalService.open(EditProfileModalComponent, {
      windowClass: "editProfile-Modal"
    });
    modalRef.componentInstance.name = 'World';
  }
}
