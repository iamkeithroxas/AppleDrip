import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService} from '../shared/service/auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private auth: AuthService, private route: Router) {}

  onLogin() {
    var formData: any = new FormData();
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    this.auth.login(formData).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.route.navigateByUrl('/home');
    }, (err) => {
      
    });
  }
}
