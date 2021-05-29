import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast: any;
  constructor(public toastController: ToastController) { }

  async showToast(Message) {
    this.toast = await this.toastController.create({
      message: Message,
      duration: 3000
    });
    this.toast.present();
  }

  dismissToast() {
    if(this.toast) {
      this.toast.dismiss();
    }
  }
}
