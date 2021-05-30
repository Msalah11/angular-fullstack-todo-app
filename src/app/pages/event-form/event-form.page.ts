import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APIService} from '../../services/API/api.service';
import {ToastService} from '../../services/notifications/toast.service';
import {BlockLoaderService} from '../../services/loaders/block-loader.service';
import {NavigationExtras, Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
})
export class EventFormPage implements OnInit {
  data: FormGroup;

  constructor(private apiService: APIService, private formBuilder: FormBuilder, private router: Router,
              private toastService: ToastService, private loader: BlockLoaderService, private translate: TranslateService) { }

  ngOnInit() {
    this.data = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  addEvent() {
    this.loader.showLoader();
    const requestData = this.handleRequestData();

    console.log('requestData', requestData);
    this.apiService.PostItem('events', requestData).subscribe(response => {
      this.loader.dismissLoader();
      this.data.reset();
      const newEvent = Object.assign(response['response'], {tasks: []});

      const navigationExtras: NavigationExtras = {
        state: {
          insertedEvent: newEvent
        }
      };

      return this.router.navigate(['/'], navigationExtras);
    }, err => {
      console.log('err', err.error);
      this.loader.dismissLoader();
      return this.toastService.showToast(err.error.message);
    });
  }

  handleRequestData() {
    const currentLocale = this.translate.currentLang;
    console.log('currentLocale', currentLocale);
    const data = {
      name: {},
      date: this.data.value.date.split('T')[0]
    };
    data.name[currentLocale] = this.data.value.name;
    return data;
  }
}
