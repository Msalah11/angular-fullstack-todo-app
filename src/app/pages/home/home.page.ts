import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {APIService} from '../../services/API/api.service';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';

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
        const newTask = this.router.getCurrentNavigation().extras.state.insertedTask;

        if(newEvent) {
          const eventIndex = this.events.findIndex(e => e.id === newEvent.id);

          if(eventIndex > 0) {
            return this.events[eventIndex].name = newEvent.name;
          }
          this.events.push(newEvent);
        }

        if(newTask) {
          const eventIndex = this.events.findIndex(e => e.id === newTask.event_id);
          return this.events[eventIndex].tasks.push(newTask);
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
    const navigationExtras: NavigationExtras = {
      state: {
        eventData: event
      }
    };
    return this.router.navigate(['tasks'], navigationExtras);  }

  editEvent(event) {
    const navigationExtras: NavigationExtras = {
      state: {
        eventData: event
      }
    };
    return this.router.navigate(['events'], navigationExtras);
  }

  addEvent() {
    return this.router.navigate(['events']);
  }

  deleteEvent(event, index) {
    this.apiService.DeleteItem(`events/${event.id}`).subscribe(res => {
      this.events.splice(index,1);
    });
  }
}
