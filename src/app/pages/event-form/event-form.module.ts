import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventFormPageRoutingModule } from './event-form-routing.module';

import { EventFormPage } from './event-form.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventFormPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [EventFormPage]
})
export class EventFormPageModule {}
