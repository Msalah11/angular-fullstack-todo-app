import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskFormPageRoutingModule } from './task-form-routing.module';

import { TaskFormPage } from './task-form.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskFormPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [TaskFormPage]
})
export class TaskFormPageModule {}
