import { Component } from '@angular/core';
import { AuthService } from './auth/shared/service/auth/auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AppleDrip';

  constructor(private auth: AuthService, private route: Router) {}

  // ngOnInit(): void {
  //   this.auth.User().subscribe(
  //     (res) => {
  //       console.log(res)
  //     }, (err) => {
  //       console.log(err)
  //       this.route.navigateByUrl('/')
  //     }
  //   )
  // }

}
