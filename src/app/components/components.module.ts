import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {EventCardComponent} from './event-card/event-card.component';
import {TaskCardComponent} from './task-card/task-card.component';
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [EventCardComponent, TaskCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [EventCardComponent, TaskCardComponent]
})
export class ComponentsModule { }
