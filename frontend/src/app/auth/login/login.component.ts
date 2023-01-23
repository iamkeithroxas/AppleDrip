import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../shared/service/auth/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  ImagePath: string;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  jwtHelper = new JwtHelperService();
  constructor(private auth: AuthService, private route: Router) {
    //image location
    this.ImagePath = '/assets/images/appledrip.png'
  }

  ngOnInit(): void {}

  onLogin() {
    var formData: any = new FormData();
    formData.append('email', this.loginForm.get('email')?.value);
    formData.append('password', this.loginForm.get('password')?.value);
    this.auth.login(formData).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.saveUserInfo();
      },
      (err) => {}
    );
  }

  saveUserInfo() {
    this.auth.User().subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.route.navigateByUrl('/');
    });
  }
}
