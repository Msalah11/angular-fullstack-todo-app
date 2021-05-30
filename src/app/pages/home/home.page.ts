import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {APIService} from '../../services/API/api.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  events = [];
  constructor(private authService: AuthService, private apiService: APIService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadEvents();

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const newEvent = this.router.getCurrentNavigation().extras.state.insertedEvent;

        if(newEvent) {
          this.events.push(newEvent);
        }
      }
    });
  }

  userLogout() {
    return this.authService.logout();
  }

  loadEvents() {
    this.apiService.GetItem('events').subscribe(res => {
      this.events = res['response'];
    });
  }

  addTask(event) {
    console.log(event);
  }

  editEvent(event) {
    console.log(event);
  }

  addEvent() {
    return this.router.navigate(['events']);
  }
}
