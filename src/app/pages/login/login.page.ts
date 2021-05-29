import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {APIService} from '../../services/API/api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {ToastService} from '../../services/notifications/toast.service';
import {BlockLoaderService} from '../../services/loaders/block-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data: FormGroup;

  constructor(private authService: AuthService, private apiService: APIService, private formBuilder: FormBuilder,
              private toastService: ToastService, private loader: BlockLoaderService) {

    this.data = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {

  }

  doLogin() {
    this.loader.showLoader();
    this.apiService.PostItem('login', this.data.value).subscribe(response => {
      this.authService.login(response);
      this.loader.dismissLoader();
      this.data.reset();
    }, err => {
      console.log('err', err.error);
      this.loader.dismissLoader();
      return this.toastService.showToast(err.error.message);
    });
  }

}
