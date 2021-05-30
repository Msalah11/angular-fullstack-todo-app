import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APIService} from '../../services/API/api.service';
import {ToastService} from '../../services/notifications/toast.service';
import {BlockLoaderService} from '../../services/loaders/block-loader.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Priority from '../../data/Priorities';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage implements OnInit {
  data: FormGroup;
  priorities = Priority;
  constructor(private apiService: APIService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
              private toastService: ToastService, private loader: BlockLoaderService, private translate: TranslateService) { }

  ngOnInit() {
    this.data = this.formBuilder.group({
      id: [''],
      event_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      name: ['', Validators.required],
      priority: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const eventData = this.router.getCurrentNavigation().extras.state.eventData;
        console.log('eventData', eventData);
        if(eventData) {
          this.data.controls.event_id.patchValue(eventData.id);
        }
      }
    });

    console.log('priorities', this.priorities);
  }

  addTask() {
    this.loader.showLoader();
    const requestData = this.handleRequestData();

    this.apiService.PostItem('tasks', requestData).subscribe(response => {
      this.loader.dismissLoader();

      const newTask = Object.assign(response['response'], {event_id: this.data.value.event_id});

      const navigationExtras: NavigationExtras = {
        state: {
          insertedTask: newTask
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
      start_date: this.data.value.start_date.split('T')[0],
      end_date: this.data.value.end_date.split('T')[0],
      priority: this.data.value.priority,
      event_id: this.data.value.event_id
    };
    data.name[currentLocale] = this.data.value.name;
    return data;
  }
}
