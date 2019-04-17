import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { Tab1Page } from './tab1';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    Tab1Page,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgCalendarModule,
    IonicPageModule.forChild(Tab1Page),
  ],
})
export class Tab1PageModule {}
