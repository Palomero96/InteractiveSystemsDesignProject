import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { Tab1Page } from './tab1';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgCalendarModule  } from 'ionic2-calendar';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    Tab1Page,
  ],
  providers:[
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgCalendarModule,
    IonicPageModule.forChild(Tab1Page),
    AngularFireAuthModule,
  ],
})
export class Tab1PageModule {}
