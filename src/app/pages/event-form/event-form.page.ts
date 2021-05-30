import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APIService} from '../../services/API/api.service';
import {ToastService} from '../../services/notifications/toast.service';
import {BlockLoaderService} from '../../services/loaders/block-loader.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
})
export class EventFormPage implements OnInit {
  data: FormGroup;

  constructor(private apiService: APIService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
              private toastService: ToastService, private loader: BlockLoaderService, private translate: TranslateService) { }

  ngOnInit() {
    this.data = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      date: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const eventData = this.router.getCurrentNavigation().extras.state.eventData;
        if(eventData) {
          this.data.controls.name.patchValue(eventData.name);
          this.data.controls.date.patchValue(eventData.date);
          this.data.controls.id.patchValue(eventData.id);
        }
      }
    });
  }

  onFormSubmit() {
    return this.data.value.id ? this.editEvent() : this.addEvent();
  }

  addEvent() {
    this.loader.showLoader();
    const requestData = this.handleRequestData();

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
      this.loader.dismissLoader();
      return this.toastService.showToast(err.error.message);
    });
  }

  editEvent() {
    this.loader.showLoader();
    const requestData = this.handleRequestData();

    this.apiService.PutItem(`events/${this.data.value.id}`, requestData).subscribe(response => {
      this.loader.dismissLoader();

      const navigationExtras: NavigationExtras = {
        state: {
          insertedEvent: this.data.value
        }
      };
      this.data.reset();
      return this.router.navigate(['/'], navigationExtras);
    }, err => {
      this.loader.dismissLoader();
      return this.toastService.showToast(err.error.message);
    });
  }

  handleRequestData() {
    const currentLocale = this.translate.currentLang;
    const data = {
      name: {},
      date: this.data.value.date.split('T')[0]
    };
    data.name[currentLocale] = this.data.value.name;
    return data;
  }
}
