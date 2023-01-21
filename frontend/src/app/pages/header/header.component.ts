import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private auth: AuthService, private route: Router) {}

  Logout() {
    this.auth.Logout().subscribe((data) => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.route.navigate(['login'])
      console.log(data)
    })
  }
}
