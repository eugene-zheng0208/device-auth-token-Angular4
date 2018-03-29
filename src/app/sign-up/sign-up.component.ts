import {Component, OnInit} from '@angular/core';
import {AuthService, SignUp} from '../auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  sign_up = new SignUp();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  data() {
    let body = JSON.stringify({
      'name': this.sign_up.name,
      'company': this.sign_up.company,
      'email': this.sign_up.email,
      'password': this.sign_up.password,
      'password_confirmation': this.sign_up.password_confirmation
    });
    this.authService.signUp(body).then((response) => {
      console.log(response);
    });
  }

}

