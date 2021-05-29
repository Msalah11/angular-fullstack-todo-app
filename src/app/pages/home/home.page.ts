import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  userLogout() {
    return this.authService.logout();
  }
}
