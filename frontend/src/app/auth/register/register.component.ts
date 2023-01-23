import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/service/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  ImagePath: string;
  constructor(private auth: AuthService, private route: Router) {
    //image location
    this.ImagePath = '/assets/images/appledrip.png'
  
}
registerForm = new FormGroup ({
  first_name: new FormControl,
  last_name: new FormControl,
  email: new FormControl,
  username: new FormControl,
  password: new FormControl,
  password_confirm: new FormControl,

})

register() {
  const userInfo: any = new FormData()
  userInfo.append('firstname', this.registerForm.get('firstname')?.value)
  // console.log(this.registerForm.get('firstname')?.value)
  this.auth.Register(this.registerForm.value).subscribe(data=>{
    this.route.navigateByUrl('/login')
    console.log(data)
  })
  console.log(this.registerForm.value)
}
}
