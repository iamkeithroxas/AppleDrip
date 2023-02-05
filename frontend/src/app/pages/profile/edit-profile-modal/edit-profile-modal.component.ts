import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.css'],
})
export class EditProfileModalComponent {
  UserId: number = 1;
  firstname?: string;
  lastname?: string;
  email?: string;
  date_joined?: Date;
  profileImage?: string;
  newImage?: string;

  first_name: string = '';
  last_name: string = '';
  ImageFile = [];
  ImageSrc: string | SafeUrl =
    'https://images.unsplash.com/photo-1521911528923-9c3838123490?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';

  constructor(private auth: AuthService, private sanitizer: DomSanitizer) {}

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
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.email = data.email;
      this.date_joined = data.date_joined;
      this.profileImage = data.image;
      this.newImage = data.image;
      this.ImageSrc = 'http://127.0.0.1:8000/' + data.image;
    }
  }

  getImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.ImageSrc = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );
      console.log(file.length, 'length');
      this.ImageFile = file;
      this.newImage = file.name;
    }
  }

  updateUserProfile() {
    var formData: any = new FormData();
    formData.append('user_id', this.UserId);
    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('image', this.ImageFile);
    formData.append('email', this.email);
    this.auth.UpdateProfile(this.UserId, formData).subscribe((data) => {
      // localStorage.setItem('user', JSON.stringify(data));
      // console.log(localStorage.getItem('user'))
      // window.location.reload()
      let newUserData = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        date_joined: data.date_joined,
        image: 'media/profile/' + this.newImage,
      };
      localStorage.setItem('user', JSON.stringify(newUserData));
      window.location.reload()
    });
  }
}
