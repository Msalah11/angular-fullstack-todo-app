import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);

  constructor( private router: Router, private storage: Storage, private platform: Platform,
               public toastController: ToastController) {

    void this.storage.create();

    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });

  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login() {

    const dummyData = {
      email: 'Msalah',
      password: 'password'
    };
    this.storage.set('USER_INFO', dummyData).then((response) => {
      this.router.navigate(['']);
      this.authState.next(true);
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
