import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {APIService} from '../../services/API/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService, private apiService: APIService) { }

  ngOnInit() {
    this.loadEvents();
  }

  userLogout() {
    return this.authService.logout();
  }

  loadEvents() {
    this.apiService.GetItem('events').subscribe(res => {
      console.log(res);
    });
  }
}
