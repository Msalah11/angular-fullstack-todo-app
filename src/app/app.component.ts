import {AuthService} from './services/authentication/auth.service';
import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router, private translateService: TranslateService,
              private storage: Storage) {
    this.initializeApp();
  }

  initializeApp() {
    this.setDefaultLocale();
    this.getToken();

    this.authService.authState.subscribe(state => {
      if (state) {
        return this.router.navigate(['']);
      }

      return this.router.navigate(['login']);
    });
  }

  private setDefaultLocale() {
    this.storage.get('MSALAH:LOCALE').then(locale => {

      if(locale) {
        return this.setAppLocale(locale);
      }

      this.storage.set('MSALAH:LOCALE', 'en');
      return this.setAppLocale('en');
    });
  }

  private setAppLocale(locale) {
    this.translateService.setDefaultLang(locale);
    document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', locale);
  }

  private getToken() {
    if(!this.authService.apiToken) {
      this.storage.get(this.authService.userStorageKey).then(userData =>
        this.authService.apiToken = userData ? userData.token : '');
    }
  }
}
