import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { UserProfile} from '../model/user-profile'
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  ImagePath: string;
  
  UserToken: UserProfile[] = [];

  jwtHelper = new JwtHelperService();
  constructor(private auth: AuthService, private route: Router,private sanitizer: DomSanitizer) {
    
    //image location
    this.ImagePath = '/assets/images/appledrip.png';
   
    
  
  }
  UserId: number = 1;
  firstname?: string;
  lastname?: string;
  email?: string;
  ngOnInit(): void {
    this.getUserProfile();

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

  Logout() {
    this.auth.Logout().subscribe((data) => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.route.navigate(['login'])
      console.log(data)
    })
  }
}
