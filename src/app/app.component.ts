import {AuthService} from './services/authentication/auth.service';
import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.authState.subscribe(state => {
      if (state) {
        return this.router.navigate(['']);
      }

      return this.router.navigate(['login']);
    });
  }
}
