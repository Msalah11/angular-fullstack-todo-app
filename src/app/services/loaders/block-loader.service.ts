import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BlockLoaderService {
  loader: any;
  constructor(public loadingController: LoadingController) { }

  async showLoader() {
    this.loader = await this.loadingController.create({
      message: 'Please wait...',
    });
    await this.loader.present();
  }

  async dismissLoader() {
    if(this.loader) {
      this.loader.dismiss();
    }
  }
}
