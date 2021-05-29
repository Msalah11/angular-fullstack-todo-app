import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {APIService} from '../../services/API/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private apiService: APIService) { }

  ngOnInit() {
    this.doLogin();
    // this.authService.login();
  }

  doLogin() {
    const userData = {
      email: 'salah@app.com',
      password: 'password'
    };
    this.apiService.PostItem('login', userData).subscribe(response => {
      console.log('resp', response);
    });
  }

}
