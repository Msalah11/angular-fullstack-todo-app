import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);
  userStorageKey = 'MSALAH:USER_INFO';
  apiToken: string;

  constructor( private router: Router, private storage: Storage) {
    void this.storage.create();
    this.ifLoggedIn();
  }

  ifLoggedIn() {
    this.storage.get(this.userStorageKey).then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login(userData) {
    this.storage.set(this.userStorageKey, userData).then((response) => {
      this.apiToken = userData.token;
      this.router.navigate(['']);
      this.authState.next(true);
    });
  }

  logout() {
    this.storage.remove(this.userStorageKey).then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
